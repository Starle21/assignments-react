## Making the App's Composition Better Part 1

The point is to show how to make the core of the application modular, so it is easily extensible, ready to change, low on coupling, obvious on the first sight what it is doing, with well defined boundaries and functional core approach.

Of course, for a toy CRUD application such as this one, it is an overkill, but on this small app, the concepts can be easier to present. The domain of this CRUD app is very shallow, containing mostly only the domain types.

The idea is to extract Use-Cases to their own standalone functions with defined input and output boundaries called ports, so the core of the application doesn't depend on UI and infrastructure and the direction of dependencies switches.

The whole point is to create an application core as a chain of pure data transformations. We want to first model the domain, define a set of domain functions with Use-Cases on top of them. That way the core of the application is a standalone module, explicit and not mixed with UI and infrastrucure layers, so they can be easily switched.

This style of composition applies more generally. It is not that common in the web frontend world, where the ideal is to get data preprocessed from a server that keeps the client thin. However with more local-first approach with heavier business logic and data processing on the client, it can be a viable approach.

### Domain Modelling

#### Types, Domain and Pure Functions

The first step is defining types that are used in the domain. Here the only relevant domain type is just the Todo type. It goes through a raw stage first - RawTodo - to reach the FullTodo type. The Todo type is then the union of RawTodo and FullTodo. 3 respective domain factory functions know how to create these types.

Even though Sorting and Counting functions are pure, they belong more to the UI state. In my view, they can be considered a part of the domain if the internal structure of data they operate on is more complex, and the domain that encapsulates it knows the best how to deal with it.

```typescript
// types
type FullTodo = {
    id: TodoId;
    label: TodoLabel;
    isDone: TodoState;
    createdAt: TodoCreatedTime;
};

type RawTodo = NewRawTodo | LabelRawTodo | CheckedRawTodo;

type Todo = FullTodo | RawTodo;
```

```typescript
// domain functions
type CreateDraftTodo = (label: string) => NewRawTodo;
export type CreateLabelTodo = (id: TodoId, label: string) => LabelRawTodo;
export type CreateCheckedTodo = (id: TodoId, isDone: boolean) => CheckedRawTodo;
```

```typescript
// pure functions
type SortTodos = (todos: Todo[]) => Todo[];
type CountTodos = (items: Todo[]) => CountedTodos;
```

#### User Interactions

Then we can define types of User Interactions.
User interactions include User cases inside themselves and wrap them with other UI state changes, like toggling visibility of the form.

```typescript
type CancelTodo = () => void;
type AddTodo = (label: string) => void;
type EditTodo = (id: TodoId) => (label: string) => void;
type RemoveTodo = (id: TodoId) => () => void;
type ToggleCheckTodo = (id: TodoId) => (isDone: boolean) => void;
```

#### Use-Cases - Input Ports

Use-Cases define what the application is actually about, building a data transformation pipeline on top of domain functions. The pipeline starts with acquiring data, processing it, and then sending it outside to other modules. Use-Cases' types tell the outside world how to interact with them. They are the "input ports" into the application.

Since this is a CRUD app, the Use-Cases are just about reading data from an api and then saving it in a runtime store. However, there is usually validation upon reading user's input, along creation of a partial Todo object - and this can be considered as a domain function, that the Use-Cases depend upon.

```typescript
type InitializeTodos = () => Promise<void>;
type CreateTodo = (label: string) => Promise<void>;
type UpdateTodo = (id: TodoId, label: string) => Promise<void>;
type DeleteTodo = (id: TodoId) => Promise<void>;
type ToggleCompleteTodo = (id: TodoId, isDone: boolean) => Promise<void>;
```

#### Output ports

The Use-Cases rely on outside resources and infrastructure for acquiring and providing data on their edges. They define a specific shape the outside world needs to comply with. Which it usually doesn't, so there are adapter functions in between that transform the shapes and allow to keep the core, services and UI separate to do their things in the way they want.

##### Infrastructure ports

```typescript
type GetTodosServer = () => Promise<FullTodo[]>;
type PostTodoServer = (todo: Partial<FullTodo>) => Promise<FullTodo>;
type PatchTodoServer = (draftTodo: Partial<FullTodo>) => Promise<FullTodo>;
type DeleteTodoServer = (id: TodoId) => Promise<void>;
type PatchCompleteTodoServer = (id: TodoId) => Promise<FullTodo>;
type PatchToggleTodoServer = (todo: Partial<FullTodo>) => Promise<FullTodo>;
```

##### Runtime store ports

This extension introduces Context store, which provides apis to the individual components. Components themselves are free of any logic, just calling the provided functions or data. The store is divided into 2 parts and multiple providers for performance. The UserInteractionStore holds the UI data together with User Interactions, which wrap around the shallow Use-Cases marked as //CORE.
Even though the Use-Cases are not completely separated, they rely primarily on the types of output ports and define their shape with input ports. The store code rather adapts to them, so decoupling Use-Cases in the future will not be difficult.

```typescript
// runtime store ports
type SaveTodoStore = (patch: FullTodo | FullTodo[]) => void;
type RemoveOneTodoFromStore = (id: TodoId) => void;
```

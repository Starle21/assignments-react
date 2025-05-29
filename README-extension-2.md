## Making the App's Composition Better Part 2

Moving forward with isolating application core from the outside concerns of UI and infrastructure, the Use-Cases are now extracted into its own functions. They can be found in the core folder of the feature-todos. To be able to connect with the outside, we are using adapters and partial function application. The functions are pre-baked with their closures, and the Use-Case can call its own definition of its outside needs.

For instance, in the createTodo function, there are 2 outside functions that the Use-Case gets in its closure:

-   the saveTodo function, which internally calls the adapted useContext hook and servers as the bridge to the UI,
-   and the postTodo function, which interfaces with the network and adapts the received data to the Use-Cases's needs.

As an example of a domain function, I added validateLabel function, which limits the number of characters to 60.

<br>

The fetch function for network communication is also abstracted into its own module from the previous api.ts file, as it is a generic service that can work in multiple projects.

Types file gets separated clearly into its input and output ports and domain types. By referring to those files, we can easily see what the application provides and what it is about.

The whole of the core - domain, use-cases, types - with its infrastructure and UI container components form a "feature slice" which is separated from the rest of the application and can be easily removed.

### Is it worth to use such a composition?

This style is definitely not a silver bullet. It is not perfect:

-   It introduces indirection and additional complexity. There needs to be code written that translates data on the boundaries.
-   There is simply more code to read and it can be hard to see connections at first sight. This puts the entry threshold into a project higher up.
-   For CRUD applications this approach is a total overkill. In such a case, it is still a good approach to define the types, domain core and use-cases first, and make the conceptual modules depend on types, which makes it easy in the future to potentially divide the code more, when the app scales up.
-   Code that is easy to understand is one of the goals of good software design. Modularity, extensibility and readiness to change is another. But these two can go against each other - modularity makes the code more indirect and complex, so it is not exatcly easy to understand. On the other hand easy to understand code is often highly entangled and coupled. It is a trade-off and each project needs to balance these two goals individually.

Where it can be considered?

-   For long-term mantained applications, where this organization and composition of code pays off in its readiness to changes and extensions.
-   For apps that need to transform data locally and involve more business logic on the client, the explicit domain extraction into functional core approach with its data transformation pipeline can provide extra benefits. The separation of features into slices untangles different concerns and enables different parts of code to change separately.

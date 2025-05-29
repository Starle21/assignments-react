import { get, patch, post, remove } from "../../../services/network";
import { DeleteRequest, GetRequest, PatchCompleteRequest, PatchRequest, PostRequest } from "../../../shared/types";
import { DeleteTodoServer, GetTodosServer, PatchCompleteTodoServer, PatchTodoServer, PostTodoServer } from "../../core/ports.output";
import { FullTodo } from "../../core/types";


// ==============================
export type TodoDTO = FullTodo;
const toDomainTodos = (dto: TodoDTO[]): FullTodo[] => {
    return dto;
};

// ==============================
type GetDependencies = {
    request: GetRequest<TodoDTO[]>;
};
const createGetTodos =
    ({ request }: GetDependencies): GetTodosServer =>
        async () => {
            const response = await request("/items");
            const data = toDomainTodos(response);
            return data;
        };
export const getTodos: GetTodosServer = createGetTodos({ request: get });

// ==============================
type PostDependencies = {
    request: PostRequest<TodoDTO, Partial<FullTodo>>;
};
const createPostTodo =
    ({ request }: PostDependencies): PostTodoServer =>
        async (todo) => {
            const response = await request("/items", todo);
            return response;
        };

export const postTodo: PostTodoServer = createPostTodo({ request: post });


// ==============================
type PatchDependencies = {
    request: PatchRequest<TodoDTO, Partial<FullTodo>>;
};
const createPatchTodo =
    ({ request }: PatchDependencies): PatchTodoServer =>
        async (draftTodo) => {
            const response = await request(`/items/${draftTodo.id}`, draftTodo);
            return response;
        };

export const patchTodo: PatchTodoServer = createPatchTodo({ request: patch });

// ==============================
type PatchCompleteDependencies = {
    request: PatchCompleteRequest<TodoDTO>;
};
const createPatchCompleteTodo =
    ({ request }: PatchCompleteDependencies): PatchCompleteTodoServer =>
        async (id) => {
            const response = await request(`/items/${id}/done`);
            return response;
        };

export const patchCompleteTodo: PatchCompleteTodoServer = createPatchCompleteTodo({ request: patch });


// ==============================
type DeleteDependencies = {
    request: DeleteRequest;
};
const deleteTodo =
    ({ request }: DeleteDependencies): DeleteTodoServer =>
        async (id) => {
            await request(`/items/${id}`);
        };

export const deleteTodoServer: DeleteTodoServer = deleteTodo({ request: remove });
export type GetRequest<R> = (url: Url) => Promise<R>;
export type PostRequest<R, S> = (url: Url, data: S) => Promise<R>;
export type PatchRequest<R, S> = (url: Url, data?: S) => Promise<R>;
export type PatchCompleteRequest<R> = (url: Url) => Promise<R>;
export type DeleteRequest = (url: Url) => Promise<void>;

export type Url = string;
export type Nullable<T> = T | null;
export type Provider<T> = () => T;

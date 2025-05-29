import { Url } from "../shared/types";

const config = { base: "http://localhost:3000" };

export const get = async <T>(url: Url): Promise<T> => {
    const pathAbsolute = new URL(url, config.base);
    const response = await fetch(pathAbsolute);
    if (!response.ok) throw new Error("Failed to perform the get request.");
    return await response.json();
};

export const post = async <T, U>(url: Url, data: U): Promise<T> => {
    const pathAbsolute = new URL(url, config.base);
    const response = await fetch(pathAbsolute, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to perform the post request.");
    return await response.json();
};

export const patch = async <T, U>(url: Url, data?: U): Promise<T> => {
    const pathAbsolute = new URL(url, config.base);
    const response = await fetch(pathAbsolute, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: data && JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to perform the patch request.");
    return await response.json();
};

export const remove = async <T>(url: Url): Promise<T> => {
    const pathAbsolute = new URL(url, config.base);
    const response = await fetch(pathAbsolute, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to perform the delete request.");
    return await response.json();
};

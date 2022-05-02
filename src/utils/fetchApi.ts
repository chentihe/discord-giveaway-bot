import fetch from "node-fetch";

const fetchApi = <T>(url: string): Promise<T> => {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json().then(data => data as T);
    });
}

export default fetchApi;
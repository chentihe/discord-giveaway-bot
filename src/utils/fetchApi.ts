import fetch from "node-fetch";
import { RequestConfig } from "./request.config";

const fetchApi = async <T>(requestConfig: RequestConfig, applyData?: Function): Promise<T> => {
    const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json() as T;

    return applyData ? applyData(data) : data;

    (data) => {
        return data.result.shift();
      }
}

export default fetchApi;
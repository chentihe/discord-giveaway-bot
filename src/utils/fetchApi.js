import fetch from "node-fetch";

const fetchApi = async (requestConfig) => {
  const response = await fetch(url, {
    method: requestConfig.method ? requestConfig.method : "GET",
    headers: requestConfig.headers ? requestConfig.headers : {},
    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export default fetchApi;

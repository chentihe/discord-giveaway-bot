import fetch from "node-fetch";

const fetchApi = async (requestConfig, applyData) => {
  const response = await fetch(requestConfig.url, {
    method: requestConfig.method ? requestConfig.method : "GET",
    headers: requestConfig.headers ? requestConfig.headers : {},
    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return applyData ? applyData(data) : data;
};

export default fetchApi;

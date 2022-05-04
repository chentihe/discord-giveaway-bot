import dotenv from "dotenv";
import fetchApi from "../fetchApi.js";

dotenv.config();

const saveNftContract = async (address) => {
  const url = new URL(process.env.ETHERSCAN_ENDPOINT);

  const params = {
    module: "contract",
    action: "getsourcecode",
    address: address,
    apikey: process.env.ETHERSCAN_API_KEY,
  };

  url.search = new URLSearchParams(params);

  const endpoint = url.href;

  const contract = await fetchApi({
    url: endpoint,
    headers: { "Content-Type": "application/json" },
  }, (data) => { return data.result.shift()});

  return fetchApi({
    url: process.env.BASE_URL + `/nfts/`,
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: {
      contractId: address,
      name: contract.ContractName,
      abi: contract.ABI,
    },
  });
};

export default saveNftContract;

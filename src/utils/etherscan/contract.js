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

  const query = new URLSearchParams(JSON.stringify(params));

  const endpoint = url.toString() + query.toString();

  const contract = fetchApi({
    url: endpoint,
    headers: { "Content-Type": "application/json" },
  }).then((data) => data.result.shift());

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

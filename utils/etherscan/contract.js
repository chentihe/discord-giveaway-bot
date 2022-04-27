import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const saveNftContract = async (address, database) => {
  const url = new URL(process.env.ETHERSCAN_ENDPOINT);

  const params = {
    module: "contract",
    action: "getsourcecode",
    address: address,
    apikey: process.env.ETHERSCAN_API_KEY,
  };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url);
  if (!response.ok) {
      throw new Error("[EtherScan] cannot get the response!!");
  }
  const data = await response.json();
  const contract = data.result.shift();
  const newNft = {
      contractId: address,
      name: contract.ContractName,
      abi: contract.ABI
  }
  return await database.create(newNft);
};

export default saveNftContract;



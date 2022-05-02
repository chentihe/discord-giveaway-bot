import dotenv from "dotenv";
import fetch, { Response } from "node-fetch";
import fetchApi from "../fetchApi";
import { Nft } from "../../db/entity/Nft";

dotenv.config();

const saveNftContract = async (address: string): Promise<Nft> => {
  const url: URL = new URL(process.env.ETHERSCAN_ENDPOINT!);

  const params: Object = {
    module: "contract",
    action: "getsourcecode",
    address: address,
    apikey: process.env.ETHERSCAN_API_KEY,
  };

  const query: URLSearchParams = new URLSearchParams(JSON.stringify(params));

  const endpoint: string = url.toString() + query.toString();

  const newNft: Object = await fetchApi<{
    status: string;
    message: string;
    result: Array<Object>;
  }>(endpoint);

  const response: Response = await fetch(process.env.BASE_URL + `/nfts/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      newNft: newNft,
    }),
  });

  if (!response.ok) {
    throw new Error("[Discord] cannot save the nft!!");
  }

  return response.json().then((data) => data as Nft);
};

export default saveNftContract;

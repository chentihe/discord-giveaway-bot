import dotenv from "dotenv";
import fetch, { Response } from "node-fetch";
import fetchApi from "../fetchApi";
import { Nft } from "../../db/entity/Nft";

dotenv.config();

const saveNftContract = async (address: string): Promise<Nft> => {

  const params: Object = {
    module: "contract",
    action: "getsourcecode",
    address: address,
    apikey: process.env.ETHERSCAN_API_KEY,
  };

  const url: URL = new URL(process.env.ETHERSCAN_ENDPOINT!);

  url.search = new URLSearchParams(JSON.stringify(params)).toString();

  const newNft: Object = await fetchApi<{
    status: string;
    message: string;
    result: Array<Object>;
  }>({url: url,
  }, (data: Object) => { return data.result.shift() });

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

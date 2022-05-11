import dotenv from "dotenv";
import fetch, { Response } from "node-fetch";
import fetchApi from "../fetchApi";
import { Nft } from "../../db/entity/Nft";
import {RequestConfig} from "../request.config";

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
  }>(
    {url: url.href}, (data: EtherSacn) => { return data.result.shift() });

  const response: Response = await fetchApi();

  if (!response.ok) {
    throw new Error("[Discord] cannot save the nft!!");
  }

  return response.json().then((data) => data as Nft);
};

export default saveNftContract;

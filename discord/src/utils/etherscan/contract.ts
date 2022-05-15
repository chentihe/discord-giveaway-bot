import dotenv from "dotenv";
import fetchApi from "../fetchApi";
import { Nft } from "../../db/entity/nft.entity";
import {
  Contract,
  EtherScan,
  RequestConfig,
  RequestMethod,
} from "..";

dotenv.config();

const saveNftContract = async (address: string): Promise<Nft> => {
  const params: Object = {
    module: "contract",
    action: "getsourcecode",
    address: address,
    apikey: process.env.ETHERSCAN_API_KEY,
  };

  const etherUrl: URL = new URL(process.env.ETHERSCAN_ENDPOINT!);

  etherUrl.search = new URLSearchParams(JSON.stringify(params)).toString();

  const newNft: void | Contract = await fetchApi<EtherScan>({
    url: etherUrl.href,
  })
    .then((etherScan) => {
      return etherScan.result[0];
    })
    .catch((error) => console.log(error));

  const nftUrl: URL = new URL(`${process.env.BASE_URL!}/nfts`);

  const nftDto: RequestConfig = {
    url: nftUrl.href,
    method: RequestMethod.POST,
    headers: { "Content-Type": "application/json" },
    body: {
      contractId: address,
      name: newNft!.ContractName,
      abi: newNft!.ABI,
    },
  };

  return fetchApi(nftDto);
};

export default saveNftContract;

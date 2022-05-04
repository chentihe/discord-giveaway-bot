import dotenv from "dotenv";
import fetchApi from "../fetchApi.js";

dotenv.config();

const fetchNftAmount = async (member, contractId) => {
  const response = await fetchApi({
    url: process.env.BASE_URL + `/nftamounts/${contractId}/${member.user.id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const bonus = await response.json();

  return bonus.nftAmount;
};

export default fetchNftAmount;

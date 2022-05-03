import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const fetchNftAmount = async (member, contractId) => {
  const response = await fetch(
    process.env.BASE_URL + `/nftamounts/${contractId}/${member.user.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const bonus = await response.json();

  return bonus.nftAmount;
};

export default fetchNftAmount;

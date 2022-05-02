import { GuildMember } from "discord.js";
import dotenv from "dotenv";
import fetch, { Response } from "node-fetch";
import { Bonus } from "../db/entity/Bonus";

dotenv.config();

const fetchNftAmount = async (
  member: GuildMember,
  contractId: string
): Promise<number> => {
  const response: Response = await fetch(
    process.env.BASE_URL + `/nftamounts/${contractId}/${member.user.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const bonus: Bonus = await response.json().then(data => data as Bonus);

  return bonus.nftAmount!;
};

export default fetchNftAmount;

import { GuildMember } from "discord.js";
import dotenv from "dotenv";
import fetch, { Response } from "node-fetch";
import { Bonus } from "../db/entity/bonus.entity";

dotenv.config();

const fetchNftAmount = async <T>(
  member: GuildMember,
  contractId: string,
  applyData: Function
): Promise<number> => {
  const response: Response = await fetch(
    process.env.BASE_URL + `/nftamounts/${contractId}/${member.user.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json().then((data) => data as T);

  return applyData(data) ? applyData(data) : data;
};

export default fetchNftAmount;

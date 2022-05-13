import { GuildMember } from "discord.js";
import dotenv from "dotenv";
import { Bonus } from "../db/entity/bonus.entity";
import fetchApi from "./fetchApi";

dotenv.config();

const fetchNftAmount = async (member: GuildMember, contractId: string): Promise<number> => {
  const bonus: Bonus = await fetchApi<Bonus>({
    url: process.env.BASE_URL + `/nftamounts/${contractId}/${member.user.id}`
  });

  return bonus.nftAmount;
};

export default fetchNftAmount;

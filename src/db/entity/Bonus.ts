import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bonus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  contractId!: string;

  @Column("bigint")
  userId!: string;

  @Column("text")
  userAccountAddress!: string;

  @Column("int")
  nftAmount!: number;
}

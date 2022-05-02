import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Nft {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("text")
    contractId!: string

    @Column("text")
    name!: string

    @Column("text")
    abi!: string
}
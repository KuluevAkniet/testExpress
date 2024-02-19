import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class User extends Base {

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    lastname:string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    password:string;

    @Column({nullable: true})
    refreshToken: string;
}
import { Column, PrimaryColumn } from "typeorm";

export class User {
    @PrimaryColumn()
    id:number;
    @Column()
    
}

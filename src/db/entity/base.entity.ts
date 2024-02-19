import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Base {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name:'create_date'})
    createDate: Date;
  
    @UpdateDateColumn({name:'update_date'})
    updateDate: Date;
} 
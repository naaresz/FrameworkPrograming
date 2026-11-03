import { IsEmail } from "class-validator";
import { Entity } from "typeorm";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:100})
    nama: string;

    @IsEmail()
    @Column({type: 'varchar', length:150, unique:true})
    email: string;

    @Column({type: 'varchar', length:20})
    phone: string;

    @Column({type: 'varchar', length:100})
    alamat: string;

    @Column({type: 'int', length:8})
    password: string;

    @Column({type: 'boolean', default:true})
    isAvailable: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'update_at'})
    updateAt: Date;

    @CreateDateColumn({name: 'deleted_at', default: null})
    deleteAt: Date;
}
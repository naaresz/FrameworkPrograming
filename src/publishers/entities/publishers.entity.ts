import { Entity, OneToMany } from "typeorm";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { Timestamp } from "typeorm/driver/mongodb/bson.typings.js";
import { Book } from "../../books/entities/book-entity.js";

@Entity({name: 'publishers'})
export class Publisher{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:150})
    name: string;

    @OneToMany(() => Book, (item) => item.publisher, {
        cascade: true,
    })
    books: Book[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Timestamp;

    @CreateDateColumn({name: 'update_at'})
    updateAt: Timestamp;
}
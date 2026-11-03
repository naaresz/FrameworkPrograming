import { Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn.js";
import { Book } from "../../books/entities/book-entity.js";

@Entity({name: 'author'})
export class Author{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:150})
    name: string;

    @OneToMany(() => Book, (item) => item.authors, {
        cascade:true
    })
    books: Book[];

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @CreateDateColumn({name: 'update_at'})
    updateAt: Date;
}
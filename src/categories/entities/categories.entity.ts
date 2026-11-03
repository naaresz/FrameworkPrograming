import { Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { Book } from "../../books/entities/book-entity.js";

@Entity({name: 'categories'})
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:100, unique: true})
    name: string;

    @OneToMany(() => Book, (item) => item.categories, {
        cascade: true,
    })
    books: Book[];

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at', type: 'timestamp'})
    updateAt: Date;
}
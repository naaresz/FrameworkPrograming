import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "../../author/entities/author.entity.js";
import { JoinColumn } from "typeorm/browser/index.js";
import { Category } from "../../categories/entities/categories.entity.js";
import { Publisher } from "../../publishers/entities/publishers.entity.js";
import Joi from "joi";
import { OrderItem } from "../../order_items/entities/order-item.entity.js";

@Entity({name:'books'})
export class Book{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:100})
    title: string;

    @Column({type: 'varchar', length:50})
    author: string;

    @Column({type: 'varchar', length:100})
    isbn: string;

    @Column({type: 'int', default:0})
    publishedYear: number;

    @Column({type: 'boolean', default:true})
    isAvailable: boolean;

    @Column({type: 'decimal', precision: 12, scale: 2, default: 0})
    price: number;

    @Column({type: 'int', default: 0})
    stock: number;

    @ManyToMany(() => Author, (item) => item.books)
    @JoinTable({
        name: 'books_authors',
        joinColumn: {name: 'book_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'author_id', referencedColumnName: 'id'}
    })
    authors: Author[];

    @ManyToOne(() => Category, (item) => item.books)
    @JoinColumn({name:'category_id'})
    categories: Category[];

    @ManyToOne(() => Publisher, (item) => item.books)
    @JoinColumn({name:'publisher_id'})
    publisher: Publisher[];

    @OneToMany(() => OrderItem, (item) => item.book)
    orderItems: OrderItem[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updateAt: Date;

    @DeleteDateColumn({name: 'deleted_at', nullable: true})
    deleteAt: Date | null;
}
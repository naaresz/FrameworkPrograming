import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { Order } from "../../orders/entities/order.entity.js";
import { Book } from "../../books/entities/book-entity.js";

@Entity({name: 'orders_items'})
export class OrderItem{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, (item) => item.orderItems)
    @JoinColumn({name:'order_id'})
    order: Order;
    
    @ManyToOne(() => Book, (item) => item.orderItems)
    @JoinColumn({name:'book_id'})
    book: Book;

    @Column({type:'int'})
    quantity: number;

    @Column({type:'decimal', precision: 12, scale: 2})
    price: number;

    @Column({type:'decimal', precision: 12, scale: 2})
    subtotal: number;
}
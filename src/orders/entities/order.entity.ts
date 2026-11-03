import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, type Relation, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "../../customers/entities/customers.entity.js";
import { OrderItem } from "../../order_items/entities/order-item.entity.js";
import { Payment } from "../../payments/entities/payment.entity.js";
import { Shipment } from "../../shipments/entities/shipment.entity.js";

@Entity({name: 'orders'})
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, (item) => item.orders)
    @JoinColumn({name:'customer_id'})
    customer: Relation<Customer>;

    @Column({name:'order_number', type:'varchar', length:50, unique:true})
    orderNumber: string;

    @Column({type:'varchar', length:30})
    status: string;

    @Column({name:'total_amount', type:'decimal', precision: 12, scale: 2})
    totalAmount: number;

    @OneToMany(() => OrderItem, (item) => item.order, {
        cascade: true,
    })
    orderItems: OrderItem[];

    @OneToOne(() => Payment, (item) => item.order, {
        cascade: true,
    })
    payment: Payment;

    @OneToOne(() => Shipment, (item) => item.order, {
        cascade: true,
    })
    shipment: Shipment;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at', type: 'timestamp'})
    updateAt: Date;
}
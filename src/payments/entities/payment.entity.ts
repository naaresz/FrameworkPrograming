import { CreateDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { Order } from "../../orders/entities/order.entity.js";

@Entity({name: 'payments'})
export class Payment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Order, (item) => item.payment)
    @JoinColumn({name:'order_id'})
    order: Order;

    @Column({name: 'payment_method', type:'varchar', length:50})
    paymentMethod: string;

    @Column({type:'decimal', precision: 12, scale: 2})
    amount: number;

    @Column({type:'varchar', length:30})
    status: string;

    @Column({name: 'paid_at', type:'timestamp', nullable:true})
    paidAt: Date | null;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;
}
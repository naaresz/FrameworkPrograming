import { Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { Customer } from "../../customers/entities/customers.entity.js";
import Joi from "joi";

@Entity({name: 'customer_addresses'})
export class CustomerAddress{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, (item) => item.addresses)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;

    @Column({type: 'uuid', name: 'customer_id'})
    customerId: string;

    @Column({type:'varchar', length:150})
    recipientName: string;

    @Column({type: 'varchar', length:20})
    phone: string;

    @Column({type: 'text'})
    address: string;

    @Column({type: 'varchar', length:100})
    city: string;

    @Column({type: 'varchar', length:10})
    postalCode: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at', type: 'timestamp'})
    updateAt: Date;
}
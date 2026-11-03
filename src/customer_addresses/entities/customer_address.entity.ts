import { Entity, JoinColumn, ManyToOne, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import type { Relation } from "typeorm";
import { Customer } from "../../customers/entities/customers.entity.js";

@Entity({name: 'customer_addresses'})
export class CustomerAddress{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, (item) => item.addresses)
    @JoinColumn({name: 'customer_id'})
    customer: Relation<Customer>;

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
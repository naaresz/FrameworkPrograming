import { IsEmail } from "class-validator";
import { DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm/browser/index.js";
import { Column } from "typeorm/decorator/columns/Column.js";
import { CustomerAddress } from "../../customer_addresses/entities/customer_address.entity.js";
import { Order } from "../../orders/entities/order.entity.js";

@Entity({name: 'customers'})
export class Customer{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:150})
    name: string;

    @Column({type: 'varchar', length:150, unique:true})
    email: string;

    @Column({type: 'varchar', length:20})
    phone: string;

    @OneToMany(() => CustomerAddress, (item) => item.customer, {
        cascade: true,
    })
    addresses: CustomerAddress[];

    @OneToMany(() => Order, (item) => item.customer)
    orders: Order[];

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at', type: 'timestamp'})
    updateAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', nullable: true})
    deleteAt: Date | null;
}
import { Entity, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, Column } from "typeorm";
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

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at', type: 'timestamp'})
    updateAt: Date;
}
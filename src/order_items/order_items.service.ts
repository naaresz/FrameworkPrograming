import {
    Injectable,
    NotFoundException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from './entities/order-item.entity.js';
import { CreateOrderItemDto } from './dto/create-order-item.dto.js';
import { UpdateOrderItemDto } from './dto/update-order-item.dto.js';
import { Order } from '../orders/entities/order.entity.js';
import { Book } from '../books/entities/book-entity.js';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}

    async findAll(): Promise<OrderItem[]> {
        return await this.orderItemRepository.find({
            relations: {
                order: true,
                book: true
            }
        });
    }

    async create(orderItem: CreateOrderItemDto): Promise<OrderItem> {
        const order = await this.orderRepository.findOneBy({
            id: orderItem.orderId
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        const book = await this.bookRepository.findOneBy({
            id: orderItem.bookId
        });

        if (!book) {
            throw new NotFoundException('Buku tidak ditemukan');
        }

        const newOrderItem = this.orderItemRepository.create({
            order: order,
            book: book,
            quantity: orderItem.quantity,
            price: orderItem.price,
            subtotal: orderItem.quantity * orderItem.price
        });

        return await this.orderItemRepository.save(newOrderItem);
    }

    async findById(id: string): Promise<OrderItem> {
        const orderItem = await this.orderItemRepository.findOne({
            where: { id },
            relations: {
                order: true,
                book: true
            }
        });

        if (!orderItem) {
            throw new NotFoundException('Order item tidak ditemukan');
        }

        return orderItem;
    }

    async update(
        id: string,
        updateOrderItem: UpdateOrderItemDto
    ): Promise<OrderItem> {
        const orderItem = await this.findById(id);

        if (updateOrderItem.orderId) {
            const order = await this.orderRepository.findOneBy({
                id: updateOrderItem.orderId
            });

            if (!order) {
                throw new NotFoundException('Order tidak ditemukan');
            }

            orderItem.order = order;
        }

        if (updateOrderItem.bookId) {
            const book = await this.bookRepository.findOneBy({
                id: updateOrderItem.bookId
            });

            if (!book) {
                throw new NotFoundException('Buku tidak ditemukan');
            }

            orderItem.book = book;
        }

        if (updateOrderItem.quantity !== undefined) {
            orderItem.quantity = updateOrderItem.quantity;
        }

        if (updateOrderItem.price !== undefined) {
            orderItem.price = updateOrderItem.price;
        }

        orderItem.subtotal = orderItem.quantity * orderItem.price;

        return await this.orderItemRepository.save(orderItem);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);

        await this.orderItemRepository.delete(id);

        return {
            message: 'Order item berhasil dihapus',
            deleteId: id
        };
    }
}
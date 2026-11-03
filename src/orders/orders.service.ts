import {
    Injectable,
    NotFoundException,
    ConflictException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
import { Customer } from '../customers/entities/customers.entity.js';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: {
                customer: true,
                orderItems: true,
                payment: true,
                shipment: true
            },
            order: { createdAt: 'DESC' }
        });
    }

    async create(order: CreateOrderDto): Promise<Order> {
        const existingOrder = await this.orderRepository.findOneBy({
            orderNumber: order.orderNumber
        });

        if (existingOrder) {
            throw new ConflictException('Nomor pesanan sudah digunakan');
        }

        const customer = await this.customerRepository.findOneBy({
            id: order.customerId
        });

        if (!customer) {
            throw new NotFoundException('Customer tidak ditemukan');
        }

        const newOrder = this.orderRepository.create({
            customer: customer,
            orderNumber: order.orderNumber,
            status: order.status,
            totalAmount: 0
        });

        return await this.orderRepository.save(newOrder);
    }

    async findById(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                customer: true,
                orderItems: true,
                payment: true,
                shipment: true
            }
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        return order;
    }

    async update(id: string, updateOrder: UpdateOrderDto): Promise<Order> {
        const order = await this.findById(id);

        if (updateOrder.orderNumber && updateOrder.orderNumber !== order.orderNumber) {
            const existingOrder = await this.orderRepository.findOneBy({
                orderNumber: updateOrder.orderNumber
            });

            if (existingOrder) {
                throw new ConflictException('Nomor pesanan sudah digunakan');
            }
        }

        if (updateOrder.customerId) {
            const customer = await this.customerRepository.findOneBy({
                id: updateOrder.customerId
            });

            if (!customer) {
                throw new NotFoundException('Customer tidak ditemukan');
            }

            order.customer = customer;
        }

        const updatedOrder = this.orderRepository.merge(order, {
            orderNumber: updateOrder.orderNumber,
            status: updateOrder.status
        });

        return await this.orderRepository.save(updatedOrder);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);

        await this.orderRepository.delete(id);

        return {
            message: 'Order berhasil dihapus',
            deleteId: id
        };
    }
}
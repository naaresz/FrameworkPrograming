import {
    Injectable,
    NotFoundException,
    ConflictException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { Order } from '../orders/entities/order.entity.js';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find({
            relations: {
                order: true
            },
            order: { createdAt: 'DESC' }
        });
    }

    async create(payment: CreatePaymentDto): Promise<Payment> {
        const order = await this.orderRepository.findOneBy({
            id: payment.orderId
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        const existingPayment = await this.paymentRepository.findOne({
            where: {
                order: { id: payment.orderId }
            }
        });

        if (existingPayment) {
            throw new ConflictException('Pembayaran untuk order ini sudah ada');
        }

        const newPayment = this.paymentRepository.create({
            order: order,
            paymentMethod: payment.paymentMethod,
            amount: payment.amount,
            status: payment.status,
            paidAt: payment.status.toLowerCase() === 'paid' ? new Date() : null
        });

        return await this.paymentRepository.save(newPayment);
    }

    async findById(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: {
                order: true
            }
        });

        if (!payment) {
            throw new NotFoundException('Payment tidak ditemukan');
        }

        return payment;
    }

    async update(
        id: string,
        updatePayment: UpdatePaymentDto
    ): Promise<Payment> {
        const payment = await this.findById(id);

        if (updatePayment.orderId) {
            const order = await this.orderRepository.findOneBy({
                id: updatePayment.orderId
            });

            if (!order) {
                throw new NotFoundException('Order tidak ditemukan');
            }

            if (order.id !== payment.order.id) {
                const existingPayment = await this.paymentRepository.findOne({
                    where: {
                        order: { id: updatePayment.orderId }
                    }
                });

                if (existingPayment) {
                    throw new ConflictException('Pembayaran untuk order ini sudah ada');
                }
            }

            payment.order = order;
        }

        if (updatePayment.paymentMethod !== undefined) {
            payment.paymentMethod = updatePayment.paymentMethod;
        }

        if (updatePayment.amount !== undefined) {
            payment.amount = updatePayment.amount;
        }

        if (updatePayment.status !== undefined) {
            payment.status = updatePayment.status;

            if (updatePayment.status.toLowerCase() === 'paid') {
                payment.paidAt = payment.paidAt ?? new Date();
            }
        }

        return await this.paymentRepository.save(payment);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);

        await this.paymentRepository.delete(id);

        return {
            message: 'Payment berhasil dihapus',
            deleteId: id
        };
    }
}
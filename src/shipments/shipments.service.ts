import {
    Injectable,
    NotFoundException,
    ConflictException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shipment } from './entities/shipment.entity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';
import { Order } from '../orders/entities/order.entity.js';

@Injectable()
export class ShipmentsService {
    constructor(
        @InjectRepository(Shipment)
        private readonly shipmentRepository: Repository<Shipment>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    async findAll(): Promise<Shipment[]> {
        return await this.shipmentRepository.find({
            relations: {
                order: true
            }
        });
    }

    async create(shipment: CreateShipmentDto): Promise<Shipment> {
        const order = await this.orderRepository.findOneBy({
            id: shipment.orderId
        });

        if (!order) {
            throw new NotFoundException('Order tidak ditemukan');
        }

        const existingShipment = await this.shipmentRepository.findOne({
            where: {
                order: { id: shipment.orderId }
            }
        });

        if (existingShipment) {
            throw new ConflictException('Pengiriman untuk order ini sudah ada');
        }

        const newShipment = this.shipmentRepository.create({
            order: order,
            courier: shipment.courier,
            trackingNumber: shipment.trackingNumber ?? null,
            status: shipment.status
        });

        return await this.shipmentRepository.save(newShipment);
    }

    async findById(id: string): Promise<Shipment> {
        const shipment = await this.shipmentRepository.findOne({
            where: { id },
            relations: {
                order: true
            }
        });

        if (!shipment) {
            throw new NotFoundException('Shipment tidak ditemukan');
        }

        return shipment;
    }

    async update(
        id: string,
        updateShipment: UpdateShipmentDto
    ): Promise<Shipment> {
        const shipment = await this.findById(id);

        if (updateShipment.orderId) {
            const order = await this.orderRepository.findOneBy({
                id: updateShipment.orderId
            });

            if (!order) {
                throw new NotFoundException('Order tidak ditemukan');
            }

            if (order.id !== shipment.order.id) {
                const existingShipment = await this.shipmentRepository.findOne({
                    where: {
                        order: { id: updateShipment.orderId }
                    }
                });

                if (existingShipment) {
                    throw new ConflictException('Pengiriman untuk order ini sudah ada');
                }
            }

            shipment.order = order;
        }

        if (updateShipment.courier !== undefined) {
            shipment.courier = updateShipment.courier;
        }

        if (updateShipment.trackingNumber !== undefined) {
            shipment.trackingNumber = updateShipment.trackingNumber;
        }

        if (updateShipment.status !== undefined) {
            shipment.status = updateShipment.status;

            if (updateShipment.status.toLowerCase() === 'shipped') {
                shipment.shippedAt = shipment.shippedAt ?? new Date();
            }

            if (updateShipment.status.toLowerCase() === 'delivered') {
                shipment.deliveredAt = new Date();
                shipment.shippedAt = shipment.shippedAt ?? new Date();
            }
        }

        return await this.shipmentRepository.save(shipment);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);

        await this.shipmentRepository.delete(id);

        return {
            message: 'Shipment berhasil dihapus',
            deleteId: id
        };
    }
}
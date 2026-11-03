import {
    Injectable,
    NotFoundException,
    ConflictException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './entities/customers.entity.js';
import { CreateCustomerDto } from './dto/create-customers.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find({
            relations: {
                addresses: true
            },
            order: { createdAt: 'DESC' }
        });
    }

    async create(customer: CreateCustomerDto): Promise<Customer> {
        const existingCustomer = await this.customerRepository.findOneBy({
            email: customer.email
        });

        if (existingCustomer) {
            throw new ConflictException('Email sudah digunakan');
        }

        const newCustomer = this.customerRepository.create(customer);

        return await this.customerRepository.save(newCustomer);
    }

    async findById(id: string): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: { id },
            relations: {
                addresses: true
            }
        });

        if (!customer) {
            throw new NotFoundException('Customer tidak ditemukan');
        }

        return customer;
    }

    async update(
        id: string,
        updateCustomer: UpdateCustomerDto
    ): Promise<Customer> {
        const customer = await this.findById(id);

        if (updateCustomer.email && updateCustomer.email !== customer.email) {
            const existingCustomer = await this.customerRepository.findOneBy({
                email: updateCustomer.email
            });

            if (existingCustomer) {
                throw new ConflictException('Email sudah digunakan');
            }
        }

        const updatedCustomer = this.customerRepository.merge(
            customer,
            updateCustomer
        );

        return await this.customerRepository.save(updatedCustomer);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);

        await this.customerRepository.softDelete(id);

        return {
            message: 'Customer berhasil dihapus',
            deleteId: id
        };
    }
}
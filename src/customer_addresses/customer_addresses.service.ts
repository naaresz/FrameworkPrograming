import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddress } from './entities/customer_address.entity.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';
import { Customer } from '../customers/entities/customers.entity.js';

@Injectable()
export class CustomerAddressesService {
    constructor(
        @InjectRepository(CustomerAddress)
        private readonly addressRepository: Repository<CustomerAddress>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    async findAll(): Promise<CustomerAddress[]> {
        return await this.addressRepository.find({
            relations: { customer: true },
            order: { createdAt: 'DESC' }
        });
    }

    async create(address: CreateCustomerAddressDto): Promise<CustomerAddress> {
        const customer = await this.customerRepository.findOneBy({
            id: address.customerId
        });

        if (!customer) {
            throw new NotFoundException('Customer tidak ditemukan');
        }

        const newAddress = this.addressRepository.create({
            recipientName: address.recipientName,
            phone: address.phone,
            address: address.address,
            city: address.city,
            postalCode: address.postalCode,
            customer: customer
        });

        return await this.addressRepository.save(newAddress);
    }

    async findById(id: string): Promise<CustomerAddress> {
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: { customer: true }
        });

        if (!address) {
            throw new NotFoundException('Alamat customer tidak ditemukan');
        }

        return address;
    }

    async update(
        id: string,
        updateAddress: UpdateCustomerAddressDto
    ): Promise<CustomerAddress> {
        const address = await this.findById(id);

        if (updateAddress.customerId) {
            const customer = await this.customerRepository.findOneBy({
                id: updateAddress.customerId
            });

            if (!customer) {
                throw new NotFoundException('Customer tidak ditemukan');
            }

            address.customer = customer;
        }

        const updatedAddress = this.addressRepository.merge(address, {
            recipientName: updateAddress.recipientName,
            phone: updateAddress.phone,
            address: updateAddress.address,
            city: updateAddress.city,
            postalCode: updateAddress.postalCode
        });

        return await this.addressRepository.save(updatedAddress);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);
        await this.addressRepository.delete(id);

        return {
            message: 'Alamat customer berhasil dihapus',
            deleteId: id
        };
    }
}
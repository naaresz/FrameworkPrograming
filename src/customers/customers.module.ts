import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller.js';
import { CustomersService } from './customers.service.js';
import { Customer } from './entities/customers.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddress } from '../customer_addresses/entities/customer_address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerAddress])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [TypeOrmModule]
})
export class CustomersModule {}

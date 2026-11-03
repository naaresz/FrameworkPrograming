import { Module } from '@nestjs/common';
import { CustomerAddressesController } from './customer_addresses.controller.js';
import { CustomerAddressesService } from './customer_addresses.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddress } from './entities/customer_address.entity.js';
import { Customer } from '../customers/entities/customers.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress, Customer])],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
  exports: [CustomerAddressesService]
})
export class CustomerAddressesModule {}

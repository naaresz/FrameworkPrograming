import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseUUIDPipe
} from '@nestjs/common';

import { CustomerAddressesService } from './customer_addresses.service.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Controller('customer-addresses')
export class CustomerAddressesController {
    constructor(
        private readonly customerAddressesService: CustomerAddressesService
    ) {}

    @Get()
    getAddresses() {
        return this.customerAddressesService.findAll();
    }

    @Post()
    createAddress(@Body() createAddressDto: CreateCustomerAddressDto) {
        return this.customerAddressesService.create(createAddressDto);
    }

    @Get(':id')
    getAddressById(@Param('id', ParseUUIDPipe) id: string) {
        return this.customerAddressesService.findById(id);
    }

    @Put(':id')
    updateAddress(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateAddressDto: UpdateCustomerAddressDto
    ) {
        return this.customerAddressesService.update(id, updateAddressDto);
    }

    @Delete(':id')
    deleteAddress(@Param('id', ParseUUIDPipe) id: string) {
        return this.customerAddressesService.remove(id);
    }
}
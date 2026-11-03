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

import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-customers.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Controller('customers')
export class CustomersController {
    constructor(
        private readonly customersService: CustomersService
    ) {}

    @Get()
    getCustomers() {
        return this.customersService.findAll();
    }

    @Post()
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Get(':id')
    getCustomerById(@Param('id', ParseUUIDPipe) id: string) {
        return this.customersService.findById(id);
    }

    @Put(':id')
    updateCustomer(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCustomerDto: UpdateCustomerDto
    ) {
        return this.customersService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    deleteCustomer(@Param('id', ParseUUIDPipe) id: string) {
        return this.customersService.remove(id);
    }
}
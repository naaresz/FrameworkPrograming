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

import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Get()
    getOrders() {
        return this.ordersService.findAll();
    }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get(':id')
    getOrderById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.findById(id);
    }

    @Put(':id')
    updateOrder(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.remove(id);
    }
}
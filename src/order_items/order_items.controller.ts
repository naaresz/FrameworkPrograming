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

import { OrderItemsService } from './order_items.service.js';
import { CreateOrderItemDto } from './dto/create-order-item.dto.js';
import { UpdateOrderItemDto } from './dto/update-order-item.dto.js';

@Controller('order-items')
export class OrderItemsController {
    constructor(
        private readonly orderItemsService: OrderItemsService
    ) {}

    @Get()
    getOrderItems() {
        return this.orderItemsService.findAll();
    }

    @Post()
    createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
        return this.orderItemsService.create(createOrderItemDto);
    }

    @Get(':id')
    getOrderItemById(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderItemsService.findById(id);
    }

    @Put(':id')
    updateOrderItem(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateOrderItemDto: UpdateOrderItemDto
    ) {
        return this.orderItemsService.update(id, updateOrderItemDto);
    }

    @Delete(':id')
    deleteOrderItem(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderItemsService.remove(id);
    }
}
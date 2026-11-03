import { Module } from '@nestjs/common';
import { OrderItemsController } from './order_items.controller.js';
import { OrderItemsService } from './order_items.service.js';
import { OrderItem } from './entities/order-item.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/entities/book-entity.js';
import { Order } from '../orders/entities/order.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, Book])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService]
})
export class OrderItemsModule {}

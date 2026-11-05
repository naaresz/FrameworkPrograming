import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller.js';
import { PublishersService } from './publishers.service.js';
import { Publisher } from './entities/publishers.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublishersController],
  providers: [PublishersService],
  exports: [TypeOrmModule]
})
export class PublishersModule {}

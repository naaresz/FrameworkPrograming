import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller.js';
import { AuthorService } from './author.service.js';
import { Author } from './entities/author.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService]
})
export class AuthorModule {}

import {
    Injectable,
    NotFoundException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Publisher } from './entities/publishers.entity.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>
    ) {}

    async findAll(): Promise<Publisher[]> {
        return await this.publisherRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async create(publisher: CreatePublisherDto): Promise<Publisher> {
        const newPublisher = this.publisherRepository.create(publisher);

        return await this.publisherRepository.save(newPublisher);
    }

    async findById(id: string): Promise<Publisher> {
        const publisher = await this.publisherRepository.findOne({
            where: { id },
            relations: {
                books: true
            }
        });

        if (!publisher) {
            throw new NotFoundException('Publisher tidak ditemukan');
        }

        return publisher;
    }

    async update(
        id: string,
        updatePublisher: UpdatePublisherDto
    ): Promise<Publisher> {
        const publisher = await this.findById(id);

        const updatedPublisher = this.publisherRepository.merge(
            publisher,
            updatePublisher
        );

        return await this.publisherRepository.save(updatedPublisher);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);

        await this.publisherRepository.delete(id);

        return {
            message: 'Publisher berhasil dihapus',
            deleteId: id
        };
    }
}
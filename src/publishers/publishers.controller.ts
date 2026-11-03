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

import { PublishersService } from './publishers.service.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Controller('publishers')
export class PublishersController {
    constructor(
        private readonly publishersService: PublishersService
    ) {}

    @Get()
    getPublishers() {
        return this.publishersService.findAll();
    }

    @Post()
    createPublisher(@Body() createPublisherDto: CreatePublisherDto) {
        return this.publishersService.create(createPublisherDto);
    }

    @Get(':id')
    getPublisherById(@Param('id', ParseUUIDPipe) id: string) {
        return this.publishersService.findById(id);
    }

    @Put(':id')
    updatePublisher(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePublisherDto: UpdatePublisherDto
    ) {
        return this.publishersService.update(id, updatePublisherDto);
    }

    @Delete(':id')
    deletePublisher(@Param('id', ParseUUIDPipe) id: string) {
        return this.publishersService.remove(id);
    }
}
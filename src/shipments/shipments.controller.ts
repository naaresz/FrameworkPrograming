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

import { ShipmentsService } from './shipments.service.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';

@Controller('shipments')
export class ShipmentsController {
    constructor(
        private readonly shipmentsService: ShipmentsService
    ) {}

    @Get()
    getShipments() {
        return this.shipmentsService.findAll();
    }

    @Post()
    createShipment(@Body() createShipmentDto: CreateShipmentDto) {
        return this.shipmentsService.create(createShipmentDto);
    }

    @Get(':id')
    getShipmentById(@Param('id', ParseUUIDPipe) id: string) {
        return this.shipmentsService.findById(id);
    }

    @Put(':id')
    updateShipment(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateShipmentDto: UpdateShipmentDto
    ) {
        return this.shipmentsService.update(id, updateShipmentDto);
    }

    @Delete(':id')
    deleteShipment(@Param('id', ParseUUIDPipe) id: string) {
        return this.shipmentsService.remove(id);
    }
}
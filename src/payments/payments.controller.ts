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

import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService
    ) {}

    @Get()
    getPayments() {
        return this.paymentsService.findAll();
    }

    @Post()
    createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get(':id')
    getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
        return this.paymentsService.findById(id);
    }

    @Put(':id')
    updatePayment(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePaymentDto: UpdatePaymentDto
    ) {
        return this.paymentsService.update(id, updatePaymentDto);
    }

    @Delete(':id')
    deletePayment(@Param('id', ParseUUIDPipe) id: string) {
        return this.paymentsService.remove(id);
    }
}
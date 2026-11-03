import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    Min
} from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty({ message: "Order ID harus diisi" })
    @IsString()
    readonly orderId: string;

    @IsNotEmpty({ message: "Metode pembayaran harus diisi" })
    @IsString()
    readonly paymentMethod: string;

    @IsNotEmpty({ message: "Jumlah pembayaran harus diisi" })
    @IsNumber({}, { message: "Jumlah pembayaran harus berupa angka" })
    @Min(0)
    readonly amount: number;

    @IsNotEmpty({ message: "Status pembayaran harus diisi" })
    @IsString()
    readonly status: string;

    @IsOptional()
    readonly paidAt?: Date | null;
}
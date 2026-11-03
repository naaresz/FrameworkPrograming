import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDateString
} from "class-validator";

export class CreateShipmentDto {
    @IsNotEmpty({ message: "Order ID harus diisi" })
    @IsString()
    readonly orderId: string;

    @IsNotEmpty({ message: "Kurir harus diisi" })
    @IsString()
    readonly courier: string;

    @IsOptional()
    @IsString()
    readonly trackingNumber?: string | null;

    @IsNotEmpty({ message: "Status pengiriman harus diisi" })
    @IsString()
    readonly status: string;

    @IsOptional()
    @IsDateString({}, { message: "Format tanggal pengiriman tidak valid" })
    readonly shippedAt?: Date | null;

    @IsOptional()
    @IsDateString({}, { message: "Format tanggal diterima tidak valid" })
    readonly deliveredAt?: Date | null;
}
import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({ message: "Customer ID harus diisi" })
    @IsString()
    readonly customerId: string;

    @IsNotEmpty({ message: "Nomor order harus diisi" })
    @IsString()
    readonly orderNumber: string;

    @IsNotEmpty({ message: "Status order harus diisi" })
    @IsString()
    readonly status: string;
}
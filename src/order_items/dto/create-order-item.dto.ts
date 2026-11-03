import { IsNotEmpty, IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateOrderItemDto {
    @IsNotEmpty({ message: "Order ID harus diisi" })
    @IsString()
    readonly orderId: string;

    @IsNotEmpty({ message: "Book ID harus diisi" })
    @IsString()
    readonly bookId: string;

    @IsNotEmpty({ message: "Quantity harus diisi" })
    @IsInt({ message: "Quantity harus berupa angka bulat" })
    @Min(1, { message: "Quantity minimal 1" })
    readonly quantity: number;

    @IsNotEmpty({ message: "Harga harus diisi" })
    @IsNumber({}, { message: "Harga harus berupa angka" })
    @Min(0)
    readonly price: number;

    @IsNotEmpty({ message: "Subtotal harus diisi" })
    @IsNumber({}, { message: "Subtotal harus berupa angka" })
    @Min(0)
    readonly subtotal: number;
}
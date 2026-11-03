import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerAddressDto {
    @IsNotEmpty({ message: "Nama penerima harus diisi" })
    @IsString()
    readonly recipientName: string;

    @IsNotEmpty({ message: "Nomor telepon harus diisi" })
    @IsString()
    readonly phone: string;

    @IsNotEmpty({ message: "Alamat harus diisi" })
    @IsString()
    readonly address: string;

    @IsNotEmpty({ message: "Kota harus diisi" })
    @IsString()
    readonly city: string;

    @IsNotEmpty({ message: "Kode pos harus diisi" })
    @IsString()
    readonly postalCode: string;

    @IsNotEmpty({ message: "Customer ID harus diisi" })
    @IsString()
    readonly customerId: string;
}
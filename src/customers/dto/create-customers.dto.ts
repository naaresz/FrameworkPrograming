import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto{
    @IsNotEmpty({message: "Nama harus diisi"})
    @IsString()
    readonly name: string;

    @IsNotEmpty({message:"Email diisi sesuai format!" })
    @IsEmail({}, { message: "Email harus sesuai format!" })
    readonly email: string;

    @IsNotEmpty({message:"Nomor Handphone harus di isi"})
    @IsString()
    readonly phone: string;
}
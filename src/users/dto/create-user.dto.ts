import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty({message: "Nama harus diisi"})
    readonly nama: string;

    @IsNotEmpty({message:"Email diisi sesuai format!" })
    @IsEmail()
    readonly email: string;

    @IsNotEmpty({message:"Nomor Handphone harus di isi"})
    readonly phone: string;

    @IsNotEmpty({message:"Alamat harus di isi"})
    readonly alamat: string;

    @IsNotEmpty({message:"Password harus di isi"})
    readonly password: string;

    // @IsNotEmpty({message:"Publish Year Harus diisi"})
    // @IsInt({message:"PublishYear harus berupa angka"})
    // readonly publishedYear: number;
}
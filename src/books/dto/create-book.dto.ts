import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBooksDto{
    @IsNotEmpty({message: "Judul buku harus diisi"})
    @IsString()
    readonly title: string;
    
    @IsNotEmpty({message:"ISBN harus di isi"})
    @IsString()
    readonly isbn: string;

    @IsNotEmpty({message:"Publish Year Harus diisi"})
    @IsInt({message:"PublishYear harus berupa angka"})
    readonly publishedYear: number;

    @IsNotEmpty({message: "Harga buku harus diisi"})
    @IsInt({message: "Harga buku harus berupa angka"})
    readonly price: number;

    @IsNotEmpty({message: "Stock buku harus diisi"})
    @IsInt({message: "Stock buku harus berupa angka"})
    readonly stock: number;
}
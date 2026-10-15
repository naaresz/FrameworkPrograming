import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBooksDto{
    @IsNotEmpty({message: "Title harus diisi"})
    readonly title: string;

    @IsNotEmpty({message:"Harus diisi" })
    readonly author: string;

    @IsNotEmpty({message:"ISBN harus di isi"})
    readonly isbn: string;

    @IsNotEmpty({message:"Publish Year Harus diisi"})
    @IsInt({message:"PublishYear harus berupa angka"})
    readonly publishedYear: number;
}
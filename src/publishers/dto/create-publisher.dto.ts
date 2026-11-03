import { IsNotEmpty, IsString } from "class-validator";

export class CreatePublisherDto {
    @IsNotEmpty({ message: "Nama penerbit harus diisi" })
    @IsString({ message: "Nama penerbit harus berupa teks" })
    readonly name: string;
}
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto{
    @IsNotEmpty({message: "Nama harus diisi"})
    readonly name: string;
}
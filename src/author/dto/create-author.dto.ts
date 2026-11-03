import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto{
    @IsNotEmpty({message: "Nama harus diisi!"})
    @IsString({message: "Nama harus berupa teks!"})
    readonly name: string;
}
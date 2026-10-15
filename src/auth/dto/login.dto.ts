import { IsNotEmpty } from "class-validator";

export class LoginDto{

    @IsNotEmpty({message:"Username harus diisi!"})
    readonly email: string;

    @IsNotEmpty({message:"Password harus diisi!"})
    readonly password: string;
}   
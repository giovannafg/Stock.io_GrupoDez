import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginDTO{
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    senha!: string
}
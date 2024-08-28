import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    Email: string

    @IsNotEmpty()
    Pass: string
}
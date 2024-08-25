import { IsEmail, IsNotEmpty } from "class-validator"

export class RegisterDto {


    @IsNotEmpty()
    @IsEmail()
    Email: string

    @IsNotEmpty()
    User_Name: string

    @IsNotEmpty()
    Pass: string
}
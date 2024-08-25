import { IsEmail, IsNotEmpty } from "class-validator"

export class loginUserDto {


    @IsNotEmpty()
    @IsEmail()
    Email: string

    @IsNotEmpty()
    Pass: string
}
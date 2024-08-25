
import { IsNotEmpty } from "class-validator";

export class createMessDtos {

    Content?: string

    @IsNotEmpty()
    Type: number

    @IsNotEmpty()
    Mess_Topic: string

    @IsNotEmpty()
    User_Id: string
}
import { IsNotEmpty } from "class-validator";


export class createContactDto {

    @IsNotEmpty()
    User_Id: string;
}
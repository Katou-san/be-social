import { IsNotEmpty } from "class-validator";

export class getContactDto {

    @IsNotEmpty()
    Contact_Id: string;
}
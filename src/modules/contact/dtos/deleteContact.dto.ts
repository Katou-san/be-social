import { IsNotEmpty } from "class-validator";

export class deleteContactDto {

    @IsNotEmpty()
    Contact_Id: string;
}
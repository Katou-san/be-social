import { IsNotEmpty } from "class-validator"

export class create_groupDto {

    @IsNotEmpty()
    Group_Name: string
    Avatar: string
    is_Publish: boolean
}
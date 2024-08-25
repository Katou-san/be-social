import { IsOptional } from "class-validator"


export class updateUserDto {
    @IsOptional()
    Nickname: string

    @IsOptional()
    Phone: string

    @IsOptional()
    User_Name: string

    @IsOptional()
    Avartar: string

    @IsOptional()
    is_Admin: boolean

    @IsOptional()
    is_Premium: boolean

    @IsOptional()
    Role_Id: string

    @IsOptional()
    Color: string

    @IsOptional()
    Status: number
}


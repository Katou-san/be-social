import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    User_Id: string

    @Prop({ required: true, unique: true })
    Nickname: string

    @Prop({ required: true, unique: true })
    Email: string

    @Prop({ default: null })
    Phone: string

    @Prop({ required: true })
    User_Name: string

    @Prop({ required: true })
    Pass: string

    @Prop({ required: true, default: 'default.png' })
    Avartar: string

    @Prop({ required: true, default: false })
    is_Admin: boolean

    @Prop({ required: true, default: false })
    is_Premium: boolean

    @Prop({ required: true })
    Role_Id: string

    @Prop({ required: true, default: new Date().toISOString() })
    Create_Day: string

    @Prop({ required: true, default: '#fff' })
    Color: string

    @Prop({ required: true, default: 1 })
    Status: number
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)
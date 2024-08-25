import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Group {
    @Prop({ required: true, unique: true })
    Group_Id: string

    @Prop({ required: true })
    Group_Name: string

    @Prop({ default: "default.png" })
    Avatar: string

    @Prop({ required: true })
    User_Id: string

    @Prop({ required: true, default: false })
    is_Publish: boolean

    @Prop({ required: true, default: new Date().toISOString() })
    Post_Time: string

}
export type UserDocument = HydratedDocument<Group>
export const UserSchema = SchemaFactory.createForClass(Group)
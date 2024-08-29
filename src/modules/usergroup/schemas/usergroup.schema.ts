import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class userGroup {
    @Prop({ required: true, unique: true })
    Group_Id: string

    @Prop({ required: true })
    User_Id: string


    @Prop({ required: true, default: new Date().toISOString() })
    Post_Time: string

}
export type UserGroupDocument = HydratedDocument<userGroup>
export const userGroupSchema = SchemaFactory.createForClass(userGroup)
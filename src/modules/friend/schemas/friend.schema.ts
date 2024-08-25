import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Friend {
    @Prop({ required: true })
    User_Id: string

    @Prop({ required: true })
    Friend_Id: string


}
export type FriendDocument = HydratedDocument<Friend>
export const FriendSchema = SchemaFactory.createForClass(Friend)
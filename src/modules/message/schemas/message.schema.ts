import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Message {

    @Prop({ required: true, unique: true })
    Message_Id: string

    @Prop({ required: true })
    Message_Topic: string

    @Prop({ required: true })
    User_Id: string

    @Prop()
    Content: string

    @Prop({ required: true, default: 0 })
    Type: number

    @Prop({ required: true, default: new Date().toISOString() })
    Post_Time: string



}
export type MessageDocument = HydratedDocument<Message>
export const MessageSchema = SchemaFactory.createForClass(Message)
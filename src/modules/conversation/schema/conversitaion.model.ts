import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Conversation {

    @Prop({ required: true, unique: true })
    Conversation_Id: string

    @Prop({ required: true })
    User1_Id: string

    @Prop({ required: true })
    User2_Id: string

    @Prop({ required: true, default: new Date().toISOString() })
    Post_Time: string



}
export type ConversationDocument = HydratedDocument<Conversation>
export const ConversationSchema = SchemaFactory.createForClass(Conversation)
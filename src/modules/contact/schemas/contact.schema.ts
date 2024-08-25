import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Contact {
    @Prop({ required: true, unique: true })
    Contact_Id: string

    @Prop({ required: true })
    User_Id: string

    @Prop({ default: false })
    is_Publish: boolean

    @Prop({ default: new Date().toISOString() })
    Post_Time: string

}
export type ContactDocument = HydratedDocument<Contact>
export const contactSchema = SchemaFactory.createForClass(Contact)
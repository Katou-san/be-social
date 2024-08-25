import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Media {
    @Prop({ required: true, unique: true })
    Meida_Id: string

    @Prop({ required: true })
    Meida_Topic: string

    @Prop({ required: true })
    File_Name: string

    @Prop({ required: true })
    Mine_Type: string

    @Prop({ required: true })
    Type: string

    @Prop({ required: true })
    Size: string

    @Prop({ required: true, default: new Date().toISOString() })
    Post_Time: string

}

export type MediaDocument = HydratedDocument<Media>
export const MediaSchema = SchemaFactory.createForClass(Media)
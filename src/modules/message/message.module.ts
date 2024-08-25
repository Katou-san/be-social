import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Contact, contactSchema } from "src/modules/contact/schemas/contact.schema";
import { MediaModule } from "src/modules/media/media.module";
import { MessController } from "src/modules/message/message.controller";
import { MessService } from "src/modules/message/message.service";
import { Message, MessageSchema } from "src/modules/message/schemas/message.schema";
import { User, UserSchema } from "src/modules/users/schemas/users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        MongooseModule.forFeature([{ name: Contact.name, schema: contactSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MediaModule
    ],
    controllers: [MessController],
    providers: [MessService]
})

export class MessageModule { }
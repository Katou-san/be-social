import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactController } from "src/modules/contact/contact.controller";
import { ContactService } from "src/modules/contact/contact.service";
import { Contact, contactSchema } from "src/modules/contact/schemas/contact.schema";
import { User, UserSchema } from "src/modules/users/schemas/users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Contact.name, schema: contactSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [ContactController],
    providers: [ContactService],
    exports: [ContactService]
})

export class ContactModule { }
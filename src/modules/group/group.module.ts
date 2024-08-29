import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupController } from "src/modules/group/group.controller";
import { GroupService } from "src/modules/group/group.service";
import { Group, GroupSchema } from "src/modules/group/schemas/groups.schema";
import { UserModule } from "src/modules/users/users.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
        UserModule
    ],
    controllers: [GroupController],
    providers: [GroupService]
})

export class GroupModule {

}
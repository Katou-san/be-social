import { Module } from "@nestjs/common";
import { GroupController } from "src/modules/group/group.controller";
import { GroupService } from "src/modules/group/group.service";

@Module({
    controllers: [GroupController],
    providers: [GroupService]
})

export class GroupModule {

}
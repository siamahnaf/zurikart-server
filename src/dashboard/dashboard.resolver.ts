import { Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { DashService } from "./dashboard.service";

//Entity
import { Dashboard } from "./entities/dash.entities";

//Guard
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@Resolver()
export class DashResolver {
    //Constructor
    constructor(
        private readonly dashService: DashService
    ) { }

    //Get Dash
    @Query(() => Dashboard, { name: "getDashboard" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    get() {
        return this.dashService.getDashboard();
    }
}
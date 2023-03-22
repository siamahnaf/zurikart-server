import { Module } from "@nestjs/common";

//Service and Resolver
import { DashService } from "./dashboard.service";
import { DashResolver } from "./dashboard.resolver";

//Modules
import { ProductModule } from "src/product/product.module";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        ProductModule,
        UserModule
    ],
    providers: [DashService, DashResolver]
})
export class DashModule { }
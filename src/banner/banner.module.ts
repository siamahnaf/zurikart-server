import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DynamicBanner, DynamicBannerSchema } from "./model/banner.model";
import { Articles, ArticlesSchema } from "./model/articles.model";

import { BannerService } from "./banner.service";
import { BannerResolver } from "./banner.resolver";

import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: DynamicBanner.name,
            schema: DynamicBannerSchema
        }, {
            name: Articles.name,
            schema: ArticlesSchema
        }]),
        UserModule
    ],
    providers: [BannerService, BannerResolver],
    exports: [MongooseModule]
})

export class BannerModule { };
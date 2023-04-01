import { Module } from "@nestjs/common";

//Dataloader Service
import { DataloaderService } from "./dataloader.service";

//Module
import { CategoryModule } from "src/category/category.module";
import { UserModule } from "src/user/user.module";
import { BrandModule } from "src/brand/brand.module";
import { TagModule } from "src/tag/tag.module";
import { ProductModule } from "src/product/product.module";
import { HomeModule } from "src/homepgae/home.module";

@Module({
    providers: [DataloaderService],
    imports: [CategoryModule, UserModule, BrandModule, TagModule, ProductModule, HomeModule],
    exports: [DataloaderService]
})
export class DataloaderModule { };
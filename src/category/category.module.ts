import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//Service and Resolver
import { CategoryService } from "./category.service";
import { CategoryResolver, SubCategoryResolver } from "./category.resolver";

//Schema
import { Category, CategorySchema } from "./model/category.schema";
import { Subcategory, SubcategorySchema } from "./model/sub-category.schema";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Category.name,
            schema: CategorySchema
        }, {
            name: Subcategory.name,
            schema: SubcategorySchema
        }]),
        UserModule
    ],
    providers: [CategoryService, CategoryResolver, SubCategoryResolver],
    exports: [MongooseModule, CategoryService]
})
export class CategoryModule { }
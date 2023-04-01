import { Injectable } from "@nestjs/common";
import DataLoader from "dataloader";
import { ObjectId } from "mongoose";

//Dataloader Interface
import { IDataloaders } from './dataloader.interface';

//Services
import { CategoryService } from "src/category/category.service";
import { UserService } from "src/user/user.service";
import { BrandService } from "src/brand/brand.service";
import { TagService } from "src/tag/tag.service";
import { ProductService } from "src/product/product.service";
import { HomeService } from "src/homepgae/home.service";

//Schema
//-----Category Schema
import { Category } from "src/category/model/category.schema";
import { Subcategory } from "src/category/model/sub-category.schema";
//-----Address Schema
import { User } from "src/user/model/user.schema";
//----Brand Schema
import { Brand } from "src/brand/model/brand.schema";
//----Tag Schema
import { Tag } from "src/tag/model/tag.schema";
//----Product Schema
import { Product } from "src/product/model/product.schema";
import { Section } from "src/homepgae/model/section.schema";

@Injectable()
export class DataloaderService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly userService: UserService,
        private readonly brandService: BrandService,
        private readonly tagService: TagService,
        private readonly productService: ProductService,
        private readonly homeService: HomeService
    ) { };

    createLoaders(): IDataloaders {
        const categoryLoader = new DataLoader<ObjectId, Category>(
            async (keys: readonly ObjectId[]) =>
                this.categoryService.findCategoryByBatch(keys as ObjectId[])
        );
        const subCategoryLoader = new DataLoader<ObjectId, Subcategory>(
            async (keys: readonly ObjectId[]) =>
                this.categoryService.findSubCategoryByBatch(keys as ObjectId[])
        );
        const userLoader = new DataLoader<ObjectId, User>(
            async (keys: readonly ObjectId[]) =>
                this.userService.findUserByBatch(keys as ObjectId[])
        )
        const brandLoader = new DataLoader<ObjectId, Brand>(
            async (keys: readonly ObjectId[]) =>
                this.brandService.findBrandByBatch(keys as ObjectId[])
        )
        const tagLoader = new DataLoader<ObjectId, Tag>(
            async (keys: readonly ObjectId[]) =>
                this.tagService.findTagByBatch(keys as ObjectId[])
        )
        const productLoader = new DataLoader<ObjectId, Product>(
            async (keys: readonly ObjectId[]) =>
                this.productService.findProductByBatch(keys as ObjectId[])
        )
        const sectionLoader = new DataLoader<ObjectId, Section>(
            async (keys: readonly ObjectId[]) =>
                this.homeService.findSectionByBatch(keys as ObjectId[])
        )
        return {
            categoryLoader,
            subCategoryLoader,
            userLoader,
            brandLoader,
            tagLoader,
            productLoader,
            sectionLoader
        };
    }
}
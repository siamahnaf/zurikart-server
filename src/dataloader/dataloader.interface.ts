import DataLoader from 'dataloader';
import { ObjectId } from "mongoose";

//Schema Types
import { Category } from "src/category/model/category.schema";
import { Subcategory } from "src/category/model/sub-category.schema";
import { User } from "src/user/model/user.schema";
import { Brand } from "src/brand/model/brand.schema";
import { Tag } from "src/tag/model/tag.schema";
import { Product } from "src/product/model/product.schema";

export interface IDataloaders {
    categoryLoader: DataLoader<ObjectId, Category>;
    subCategoryLoader: DataLoader<ObjectId, Subcategory>;
    userLoader: DataLoader<ObjectId, User>;
    brandLoader: DataLoader<ObjectId, Brand>;
    tagLoader: DataLoader<ObjectId, Tag>;
    productLoader: DataLoader<ObjectId, Product>;
}
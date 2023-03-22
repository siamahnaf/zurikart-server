import { Resolver, ResolveField, Parent, Mutation, Query, Args, Context, ID } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";

//Service
import { ProductService } from "./product.service";

//Entities
import { SuccessInfo } from "src/user/entities/success.entity";
import { GetProduct, Product } from "./entities/product.entity";
import { Category } from "src/category/entities/category.entity";
import { Subcategory } from "src/category/entities/sub-category.entity";
import { Brand } from "src/brand/entities/brand.entity";
import { Tag } from "src/tag/entities/tag.entity";

//Dto
import { ProductInput } from "./dto/product.dto";
import { ProductUpdateInput } from "./dto/update.dto";
import { ProductPrams } from "./dto/get-product.dto";

//Guard
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@Resolver(Product)
export class ProductResolver {
    //Constructor
    constructor(
        private readonly productService: ProductService
    ) { };

    //Get Products
    @Query(() => GetProduct, { name: "getProducts" })
    getProducts(
        @Args("productPrams") productPrams: ProductPrams
    ) {
        return this.productService.getProducts(productPrams);
    }

    //Get Single Product
    @Query(() => Product, { name: "getProduct" })
    getProduct(
        @Args("slug", { type: () => String }) slug: string
    ) {
        return this.productService.getProduct(slug)
    }

    //Get selling product
    @Query(() => [Product], { name: "getSellingProduct" })
    getSelling(
        @Args("slug", { type: () => String }) slug: string
    ) {
        return this.productService.getSelling(slug);
    }

    //Add Products
    @Mutation(() => SuccessInfo, { name: "addProduct" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("productInput") productInput: ProductInput
    ) {
        return this.productService.add(productInput);
    }

    //Update Products
    @Mutation(() => SuccessInfo, { name: "updateProduct" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("productUpdateInput") productUpdateInput: ProductUpdateInput,
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.productService.update(id, productUpdateInput);
    }

    //Add Product count
    @Mutation(() => SuccessInfo, { name: "updateProductView" })
    updateView(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.productService.updateView(id);
    }

    //Change Product Visibility
    @Mutation(() => SuccessInfo, { name: "changeProductVisibility" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    change(
        @Args("id", { type: () => ID }) id: ObjectId,
        @Args("visibility", { type: () => Boolean }) visibility: boolean
    ) {
        return this.productService.change(id, visibility);
    }

    //Delete Products
    @Mutation(() => SuccessInfo, { name: "deleteProduct" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => ID }) id: ObjectId
    ) {
        return this.productService.delete(id);
    }

    //Resolver field for Category in Product Query
    @ResolveField("category", () => Category, { nullable: true })
    getCategory(
        @Parent() product: Product,
        @Context() { loaders }: IGraphQLContext
    ) {
        return loaders.categoryLoader.load(product.category);
    }

    //Resolver field for Subcategory in Product Query
    @ResolveField("subCategory", () => [Subcategory], { nullable: true })
    getSubcategory(
        @Parent() product: Product,
        @Context() { loaders }: IGraphQLContext
    ) {
        return loaders.subCategoryLoader.loadMany(product.subCategory);
    }

    //Resolver Field for Brand in Product Query
    @ResolveField("brand", () => Brand, { nullable: true })
    getBrand(
        @Parent() product: Product,
        @Context() { loaders }: IGraphQLContext
    ) {
        if (product.brand) {
            return loaders.brandLoader.load(product.brand);
        } else return null;
    }

    //Resolver Field for Tag in Product Query
    @ResolveField("tag", () => [Tag], { nullable: true })
    getTag(
        @Parent() product: Product,
        @Context() { loaders }: IGraphQLContext
    ) {
        return loaders.tagLoader.loadMany(product.tag);
    }
}
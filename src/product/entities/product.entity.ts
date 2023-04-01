import { ObjectType, Field, HideField, ID, Float } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Date-scalar
import { DateScalar } from "src/date.scalar";

//PageInfos
import { PageInfos } from "src/user/entities/user.entity";

@ObjectType()
class ProductImage {
    @Field(() => String, { nullable: true })
    url: string;
}

@ObjectType()
class ProductAttribute {
    @Field(() => String, { nullable: true })
    variant: string;
    @Field(() => Float, { nullable: true })
    price: number;
    @Field(() => Float, { nullable: true })
    quantity: number;
    @Field(() => String, { nullable: true })
    image: string;
}

@ObjectType()
class ProductMeta {
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => [String], { nullable: true })
    metaTags: string[];
    @Field(() => String, { nullable: true })
    image: string;
}

@ObjectType()
class ProductSpecification {
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    value: string;
}

@ObjectType()
class ProductPrice {
    @Field(() => Float, { nullable: true })
    highest: number;
    @Field(() => Float, { nullable: true })
    lowest: number;
}

@ObjectType()
export class Product {
    @Field(() => ID, { nullable: true })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    slug: string;
    @HideField()
    category: ObjectId;
    @HideField()
    subCategory: ObjectId[];
    @HideField()
    brand: ObjectId;
    @Field(() => String, { nullable: true })
    unit: string;
    @Field(() => Float, { nullable: true })
    minPurchase: number;
    @HideField()
    tag: ObjectId[];
    @Field(() => Boolean, { nullable: true })
    refundAble: boolean;
    @Field(() => [ProductImage], { nullable: true })
    productImages: ProductImage[];
    @Field(() => String, { nullable: true })
    youtubeLink: string;
    @Field(() => Float, { nullable: true })
    price: number;
    @Field(() => Float, { nullable: true })
    discount: number;
    @Field(() => String, { nullable: true })
    discountUnit: string;
    @Field(() => String, { nullable: true })
    badge: string;
    @Field(() => String, { nullable: true })
    notice: string;
    @Field(() => String, { nullable: true })
    shortSummery: string;
    @Field(() => Float, { nullable: true })
    quantity: number;
    @Field(() => [ProductSpecification], { nullable: true })
    specification: ProductSpecification[];
    @Field(() => Float, { nullable: true })
    doorDeliveryFee: number;
    @Field(() => Float, { nullable: true })
    pickupFee: number;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => String, { nullable: true })
    productUrl: string;
    @Field(() => [ProductAttribute], { nullable: true })
    attributes: ProductAttribute;
    @Field(() => Boolean, { nullable: true })
    visibility: boolean;
    @Field(() => ProductMeta, { nullable: true })
    meta: ProductMeta;
    @Field(() => Float, { nullable: true })
    tax: number;
    @Field(() => String, { nullable: true })
    taxUnit: string;
    @Field(() => Float, { nullable: true })
    totalPrice: number;
    @Field(() => Float, { nullable: true })
    view: number;
    @Field(() => String, { nullable: true })
    disclaimer: string;
    @Field(() => Date, { nullable: true })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: true })
    updatedAt: DateScalar;
}

@ObjectType()
export class GetProduct {
    @Field(() => Boolean, { nullable: true })
    success: boolean;
    @Field(() => [Product], { nullable: true })
    products: Product[];
    @Field(() => PageInfos, { nullable: true })
    pageInfos: PageInfos;
    @Field(() => ProductPrice, { nullable: true })
    priceRange: ProductPrice;
}
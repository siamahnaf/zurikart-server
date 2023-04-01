import { ObjectType, HideField, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Products
import { Product } from "src/product/entities/product.entity";
import { DynamicBanner } from "src/banner/entities/banner.entity";

//Date-scalar
import { DateScalar } from "src/date.scalar";

@ObjectType()
export class Sections {
    @Field(() => ID, { nullable: false })
    id: ObjectId;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: true })
    color: string;
    @Field(() => String, { nullable: false })
    description: string;
    @Field(() => Boolean, { nullable: false })
    publish: boolean;
    @HideField()
    category1: ObjectId;
    @HideField()
    category2: ObjectId;
    @Field(() => String, { nullable: false })
    banner: string;
    @Field(() => String, { nullable: false })
    bannerUrl: string;
    @Field(() => [DynamicBanner], { nullable: true })
    dynamicBanner: DynamicBanner[];
    @Field(() => [Product], { nullable: true })
    category1Product: Product[];
    @Field(() => [Product], { nullable: true })
    category2Product: Product[];
    @Field(() => Date, { nullable: false })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: false })
    updatedAt: DateScalar;
}
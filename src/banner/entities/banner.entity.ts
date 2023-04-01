import { ObjectType, Field, HideField } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
//

@ObjectType()
export class BannerImage {
    @Field(() => String, { nullable: true })
    url: string;
    @Field(() => String, { nullable: true })
    text: string;
    @Field(() => String, { nullable: true })
    link: string;
}

@ObjectType()
export class DynamicBanner {
    @Field(() => String, { nullable: false })
    id: ObjectId;
    @Field(() => String, { nullable: false })
    title: string;
    @Field(() => String, { nullable: false })
    bannerType: string;
    @Field(() => [BannerImage], { nullable: true })
    banners: BannerImage[];
    @Field(() => String, { nullable: false })
    totalNumber: string;
    @Field(() => Boolean, { nullable: false })
    publish: boolean;
    @HideField()
    section: ObjectId;
    @Field(() => Date, { nullable: false })
    createdAt: Date;
    @Field(() => Date, { nullable: false })
    updatedAt: Date;
}
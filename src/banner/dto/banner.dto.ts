import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class DynamicBannerImageInput {
    @Field(() => String, { nullable: true })
    url: string;
    @Field(() => String, { nullable: true })
    text: string;
    @Field(() => String, { nullable: true })
    link: string;
}

@InputType()
export class DynamicBannerInput {
    @Field(() => String, { nullable: false })
    title: string;
    @Field(() => String, { nullable: false })
    bannerType: string;
    @Field(() => String, { nullable: false })
    totalNumber: string;
    @Field(() => Boolean, { nullable: false })
    publish: boolean;
    @Field(() => [DynamicBannerImageInput], { nullable: true })
    banners: DynamicBannerImageInput[];
    @Field(() => String, { nullable: false })
    section: string;
}
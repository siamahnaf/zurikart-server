import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class GalleryInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    url: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    gallery: string;
}
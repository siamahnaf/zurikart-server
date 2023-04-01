import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsOptional, IsBoolean } from "class-validator";
import { ObjectId } from "mongoose";

@InputType()
export class SectionInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    color: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Field(() => ID, { nullable: true })
    @IsString()
    @IsOptional()
    category1: ObjectId;

    @Field(() => ID, { nullable: true })
    @IsString()
    @IsOptional()
    category2: ObjectId;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    banner: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    bannerUrl: string;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    publish: boolean;
}
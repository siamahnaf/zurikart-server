import { InputType, Field, ID, Float } from "@nestjs/graphql";
import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsNumber, IsEnum, IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ObjectId } from "mongoose";

//Other input types
import { ProductImageInput, ProductAttributeInput, ProductMetaInput, ProductSpecificationInput } from "./product.dto";

@InputType()
export class ProductUpdateInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field(() => ID, { nullable: true })
    @IsString()
    @IsOptional()
    category: ObjectId;

    @Field(() => [ID], { nullable: true })
    @IsArray()
    @IsOptional()
    subCategory: ObjectId[];

    @Field(() => ID, { nullable: true })
    @IsString()
    @IsOptional()
    brand: ObjectId;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    unit: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    minPurchase: string;

    @Field(() => [ID], { nullable: true })
    @IsArray()
    @IsOptional()
    tag: ObjectId[];

    @Field(() => [ProductImageInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductImageInput)
    productImages: ProductImageInput[];

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    youtubeLink: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    discount: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    productUrl: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsEnum(["flat", "percent"], { message: "Discount unit will be only 'flat' and 'percent'!" })
    discountUnit: string;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsOptional()
    quantity: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Field(() => [ProductSpecificationInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSpecificationInput)
    specification: ProductSpecificationInput[];

    @Field(() => [ProductAttributeInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAttributeInput)
    attributes: ProductAttributeInput[];

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    visibility: boolean;

    @Field(() => ProductMetaInput, { nullable: true })
    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMetaInput)
    meta: ProductMetaInput;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsOptional()
    doorDeliveryFee: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsOptional()
    pickupFee: number;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    tax: number;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["flat", "percent"], { message: "Tax unit can be only 'flat' and 'percent'!" })
    taxUnit: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    disclaimer: string;
}
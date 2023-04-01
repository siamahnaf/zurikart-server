import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as Schemas } from "mongoose";

//All Schemas
import { Category } from "src/category/model/category.schema";
import { Subcategory } from "src/category/model/sub-category.schema";
import { Brand } from "src/brand/model/brand.schema";
import { Tag } from "src/tag/model/tag.schema";

export type ProductDocument = Product & Document;

@Schema({ _id: false })
class Images {
    @Prop({ type: String })
    url: string;
}

const ImageSchema = SchemaFactory.createForClass(Images);

@Schema({ _id: false })
class Attributes {
    @Prop({ type: String })
    variant: string;
    @Prop({ type: Number })
    price: number;
    @Prop({ type: Number })
    quantity: number;
    @Prop({ type: String })
    image: string;
}

const AttributeSchema = SchemaFactory.createForClass(Attributes);

@Schema({ _id: false })
class Meta {
    @Prop({ type: String })
    title: string;
    @Prop({ type: String })
    description: string;
    @Prop({ type: [String] })
    metaTags: string[];
    @Prop({ type: String })
    image: string;
}

const MetaSchema = SchemaFactory.createForClass(Meta);


@Schema({ _id: false })
class Specification {
    @Prop({ type: String })
    title: string;
    @Prop({ type: String })
    value: string;
}

const SpecificationSchema = SchemaFactory.createForClass(Specification);

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, slug: "name", unique: true, slugPaddingSize: 1 })
    slug: string;
    @Prop({ type: Schemas.Types.ObjectId, ref: "Category", required: true })
    category: Category;
    @Prop({ type: [{ type: Schemas.Types.ObjectId, ref: "Subcategory" }] })
    subCategory: Subcategory[];
    @Prop({ type: Schemas.Types.ObjectId, ref: "Brand" })
    brand: Brand;
    @Prop({ type: String })
    unit: string;
    @Prop({ type: Number })
    minPurchase: number;
    @Prop({ type: [{ type: Schemas.Types.ObjectId, ref: "Tag" }] })
    tag: Tag[];
    @Prop({ type: [ImageSchema] })
    productImages: Images[];
    @Prop({ type: String })
    youtubeLink: string;
    @Prop({ type: Number })
    price: number;
    @Prop({ type: Number })
    discount: number;
    @Prop({ type: String, enum: ["flat", "percent"] })
    discountUnit: string;
    @Prop({ type: Number })
    quantity: number;
    @Prop({ type: Number })
    doorDeliveryFee: number;
    @Prop({ type: Number })
    pickupFee: number;
    @Prop({ type: String })
    description: string;
    @Prop({ type: String })
    productUrl: string;
    @Prop({ type: String })
    badge: string;
    @Prop({ type: String })
    notice: string;
    @Prop({ type: String })
    shortSummery: string;
    @Prop({ type: [AttributeSchema] })
    attributes: Attributes[];
    @Prop({ type: Boolean })
    visibility: boolean;
    @Prop({ type: MetaSchema })
    meta: Meta;
    @Prop({ type: Number })
    tax: number;
    @Prop({ type: [SpecificationSchema] })
    specification: Specification[];
    @Prop({ type: String, enum: ["flat", "percent"] })
    taxUnit: string;
    @Prop({ type: Number })
    totalPrice: number;
    @Prop({ type: Number })
    view: number;
    @Prop({ type: String })
    disclaimer: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


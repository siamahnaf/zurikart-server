import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as Schemas } from "mongoose";

//Schema
import { Category } from "src/category/model/category.schema";

export type SectionDocument = Section & Document;

@Schema({ timestamps: true })
export class Section {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String })
    color: string;
    @Prop({ type: String, required: true })
    description: string;
    @Prop({ type: Schemas.Types.ObjectId, required: true, ref: "Category" })
    category1: Category;
    @Prop({ type: Schemas.Types.ObjectId, required: true, ref: "Category" })
    category2: Category;
    @Prop({ type: String, required: true })
    banner: string;
    @Prop({ type: String, required: true })
    bannerUrl: string;
    @Prop({ type: Boolean, required: true })
    publish: boolean;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
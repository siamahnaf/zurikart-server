import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as Schemas } from "mongoose";

export type DynamicBannerDocument = DynamicBanner & Document;

//All Schemas
import { Section } from "src/homepgae/model/section.schema";

@Schema({ _id: false })
export class DynamicBannerImages {
    @Prop({ type: String })
    url: string;
    @Prop({ type: String })
    text: string;
    @Prop({ type: String })
    link: string;
}

export const DynamicBannerImagesSchema = SchemaFactory.createForClass(DynamicBannerImages);

@Schema({ timestamps: true })
export class DynamicBanner {
    @Prop({ type: String, required: true })
    title: string;
    @Prop({ type: String, required: true })
    bannerType: string;
    @Prop({ type: String, required: true })
    totalNumber: string;
    @Prop({ type: [DynamicBannerImagesSchema] })
    banners: DynamicBannerImages[];
    @Prop({ type: Boolean })
    publish: boolean;
    @Prop({ type: Schemas.Types.ObjectId, ref: "Section" })
    section: Section;
}

export const DynamicBannerSchema = SchemaFactory.createForClass(DynamicBanner);
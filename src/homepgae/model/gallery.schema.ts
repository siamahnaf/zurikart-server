import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, required: true })
    url: string;
    @Prop({ type: String, required: true })
    gallery: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
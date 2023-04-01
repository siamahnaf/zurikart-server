import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticlesDocument = Articles & Document;

@Schema({ timestamps: true })
export class Articles {
    @Prop({ type: String, required: true })
    description: string;
}

export const ArticlesSchema = SchemaFactory.createForClass(Articles);
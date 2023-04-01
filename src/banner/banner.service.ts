import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import omitEmpty from "omit-empty";

import { DynamicBanner, DynamicBannerDocument } from "./model/banner.model";
import { Articles, ArticlesDocument } from "./model/articles.model";
import { DynamicBannerInput } from "./dto/banner.dto";
import { ArticlesInput } from "./dto/articles.dto";


@Injectable()
export class BannerService {
    constructor(
        @InjectModel(DynamicBanner.name) private dynamicBannerModel: Model<DynamicBannerDocument>,
        @InjectModel(Articles.name) private articlesModel: Model<ArticlesDocument>
    ) { };

    async gets() {
        const banners = await this.dynamicBannerModel.find()
        return banners;
    }
    async get(id: string) {
        const banner = await this.dynamicBannerModel.findOne({
            id: id
        });
        if (!banner) throw new NotFoundException("Banner not found!");
        return banner;
    }

    async add(dynamicBannerInput: DynamicBannerInput) {
        await this.dynamicBannerModel.create(dynamicBannerInput);
        return {
            success: true,
            message: "Banner added successfully!"
        }
    }
    async articlesGet() {
        const articles = await this.articlesModel.findOne();
        if (!articles) throw new NotFoundException("Articles not found!");
        return articles;
    }
    async update(dynamicBannerInput: DynamicBannerInput, id: string) {
        const result = await this.dynamicBannerModel.findByIdAndUpdate(id, dynamicBannerInput);
        if (!result) throw new NotFoundException("Banner not found!");
        return {
            success: true,
            message: "Banner updated successfully!"
        }
    }
    async delete(id: string) {
        const result = await this.dynamicBannerModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Banner not found!");
        return {
            success: true,
            message: "Banner Deleted successfully!"
        }
    }
    async articlesSave(articlesInput: ArticlesInput) {
        const articles = await this.articlesModel.findOne();
        if (articles) {
            await this.articlesModel.findByIdAndUpdate(articles.id, articlesInput)
        } else {
            await this.articlesModel.create(articlesInput);
        }
        return {
            success: true,
            message: "Articles Saved successfully!"
        }
    }
}
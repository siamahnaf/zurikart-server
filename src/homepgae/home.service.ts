import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

//Schema
import { BannerDocument, Banner } from "./model/banner.schema";
import { SliderDocument, Slider } from "./model/slider.schema";
import { SectionDocument, Section } from "./model/section.schema";
import { ProductDocument, Product } from "src/product/model/product.schema";
import { GalleryDocument, Gallery } from "./model/gallery.schema";
import { DynamicBanner, DynamicBannerDocument } from "src/banner/model/banner.model";
import { DynamicBanner as DynamicBanners } from "src/banner/entities/banner.entity";

//Entities
import { SuccessInfo } from "src/user/entities/success.entity";
import { Sections } from "./entities/section.entity";
import { Product as Products } from "src/product/entities/product.entity";

//Dto
import { BannerInput } from "./dto/banner.dto";
import { SliderInput } from "./dto/slider.dto";
import { SectionInput } from "./dto/section.dto";
import { GalleryInput } from "./dto/gallery.dto";

@Injectable()
export class HomeService {
    //Constructor
    constructor(
        @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
        @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Slider.name) private sliderModel: Model<SliderDocument>,
        @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
        @InjectModel(DynamicBanner.name) private dynamicModel: Model<DynamicBannerDocument>
    ) { };

    //////Banner part
    //Get banner
    async getBanners() {
        const banners = await this.bannerModel.find();
        return banners;
    }
    //Add banner
    async addBanner(bannerInput: BannerInput): Promise<SuccessInfo> {
        const count = await this.bannerModel.countDocuments();
        if (count >= 1) throw new NotFoundException("You can add 1 banner only!");
        await this.bannerModel.create(bannerInput);
        return {
            success: true,
            message: "Banner added successfully!"
        }
    }
    //Delete banner
    async deleteBanner(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.bannerModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Banner id not found!");
        return {
            success: true,
            message: "Banner deleted successfully!"
        }
    }

    /////Slider part
    //Get slider
    async getSlider() {
        const sliders = await this.sliderModel.find();
        return sliders;
    }

    //Add slider
    async addSlider(sliderInput: SliderInput): Promise<SuccessInfo> {
        const count = await this.sliderModel.countDocuments();
        if (count >= 10) throw new NotFoundException("You can add 10 banner only!");
        await this.sliderModel.create(sliderInput);
        return {
            success: true,
            message: "Slider added successfully!"
        }
    }

    //Delete slider
    async deleteSlider(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.sliderModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Slider id not found!");
        return {
            success: true,
            message: "Slider deleted successfully!"
        }
    }

    //Gallery part

    //Get Gallery
    async getGallery() {
        const gallery = await this.galleryModel.find();
        return gallery;
    }
    //Add banner
    async addGallery(bannerInput: GalleryInput): Promise<SuccessInfo> {
        const count = await this.galleryModel.countDocuments();
        if (count >= 4) throw new NotFoundException("You can add 4 gallery only!");
        await this.galleryModel.create(bannerInput);
        return {
            success: true,
            message: "Gallery added successfully!"
        }
    }
    //Delete banner
    async deleteGallery(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.galleryModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Gallery id not found!");
        return {
            success: true,
            message: "Gallery deleted successfully!"
        }
    }

    //////Section part
    //Get sections
    async getSections() {
        let sections: Sections[] = await this.sectionModel.find();
        for (let i = 0; i < sections.length; i++) {
            const category1Product: Products[] = await this.productModel.find({
                category: sections[i].category1
            });
            sections[i].category1Product = category1Product.slice(0, 10)
            const category2Product: Products[] = await this.productModel.find({
                category: sections[i].category2
            });
            sections[i].category2Product = category2Product.slice(0, 10)
            const banners: DynamicBanners[] = await this.dynamicModel.find({
                section: sections[i].id
            })
            sections[i].dynamicBanner = banners;
        }
        return sections
    }
    //Get single sections
    async getSingle(id: ObjectId) {
        const sections = await this.sectionModel.findById(id);
        if (!sections) throw new NotFoundException("Section id not found!");
        return sections
    }

    //Add section
    async addSection(sectionInput: SectionInput): Promise<SuccessInfo> {
        await this.sectionModel.create(sectionInput);
        return {
            success: true,
            message: "Section added successfully!"
        }
    }

    //Update section
    async updateSection(sectionInput: SectionInput, id: ObjectId): Promise<SuccessInfo> {
        const result = await this.sectionModel.findByIdAndUpdate(id, sectionInput, { new: true });
        if (!result) throw new NotFoundException("Section id not found!");
        return {
            success: true,
            message: "Section updated successfully!"
        }
    }

    async findSectionByBatch(Ids: ObjectId[]): Promise<(Section | Error)[]> {
        const sections = await this.sectionModel.find({ _id: { $in: Ids } });
        const mappedResults = Ids.map(
            (id) =>
                sections.find((result) => result.id === id.toString())
        );
        return mappedResults;
    }
}
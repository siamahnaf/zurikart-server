import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Cron, CronExpression } from '@nestjs/schedule';
import omitEmpty from "omit-empty";

//Schema
import { Product, ProductDocument } from "./model/product.schema";
import { Category, CategoryDocument } from "src/category/model/category.schema";
import { Subcategory, SubcategoryDocument } from "src/category/model/sub-category.schema";
import { Brand, BrandDocument } from "src/brand/model/brand.schema";

//Entities
import { SuccessInfo } from "src/user/entities/success.entity";

//Dto
import { ProductInput } from "./dto/product.dto";
import { ProductUpdateInput } from "./dto/update.dto";
import { ProductPrams } from "./dto/get-product.dto";

@Injectable()
export class ProductService {
    //Constructor
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Subcategory.name) private subcategoryModel: Model<SubcategoryDocument>,
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>
    ) { };

    //Get Products
    async getProducts(productPrams: ProductPrams) {
        const order = productPrams?.order === "aesc" ? 1 : -1;
        const sortBy = productPrams?.sortBy ? productPrams.sortBy : '_id';
        const skip = productPrams.limit * (parseFloat(productPrams.skip) - 1);
        const category = await this.categoryModel.findOne({
            slug: productPrams?.category
        });
        const brand = await this.brandModel.findOne({
            slug: productPrams?.brand
        });
        const subcategory = await this.subcategoryModel.find({
            slug: productPrams?.subCategory
        });
        let args = {};
        for (let key in productPrams) {
            if (productPrams[key].length > 0) {
                if (key === "search") {
                    args["name"] = {
                        $regex: new RegExp(productPrams['search'].replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")),
                        $options: 'i'
                    }
                }
                if (key === "category") {
                    args["category"] = category?._id
                }
                if (key === "subCategory") {
                    args["subCategory"] = {
                        $in: subcategory?.map((item) => item?._id)
                    }
                }
                if (key === "brand") {
                    args["brand"] = brand?._id
                }
                if (productPrams["visibility"]) {
                    args["visibility"] = productPrams["visibility"]
                }
                if (key === "price") {
                    args['totalPrice'] = {
                        $gte: productPrams['price'][0],
                        $lte: productPrams['price'][1],
                    }
                }
            }
        }
        const count = await this.productModel.countDocuments(args);
        const minPrice = await this.productModel.find({
            $or: [{
                category: category?._id
            }, {
                name: {
                    $regex: new RegExp(productPrams?.search?.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")),
                    $options: 'i'
                }
            }]
        }).sort({ totalPrice: 1 }).limit(1);
        const maxPrice = await this.productModel.find({
            $or: [{
                category: category?._id
            }, {
                name: {
                    $regex: new RegExp(productPrams?.search?.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")),
                    $options: 'i'
                }
            }]
        }).sort({ totalPrice: -1 }).limit(1);
        let products = await this.productModel.find(args)
            .sort({ [sortBy]: order })
            .limit(productPrams.limit + 1)
            .skip(skip)
        const hasNextPage = products.length > productPrams.limit;
        products = hasNextPage ? products.slice(0, -1) : products;
        return {
            success: true,
            products,
            pageInfos: {
                hasNextPage,
                count
            },
            priceRange: {
                highest: maxPrice[0]?.totalPrice,
                lowest: minPrice[0]?.totalPrice
            }
        }
    }

    //Get Product
    async getProduct(slug: string) {
        const product = await this.productModel.findOne({
            slug: slug
        });
        if (!product) throw new NotFoundException("Product not found!");
        return product;
    }

    //Get Selling product
    async getSelling(slug: string) {
        const product = await this.productModel.findOne({
            slug: slug
        });
        if (!product) throw new NotFoundException("Product not found!");
        const products = await this.productModel.find({
            category: product.category
        }).limit(10)
        return products;
    }

    //Add Products
    async add(productInput: ProductInput): Promise<SuccessInfo> {
        const deletedInput = await omitEmpty(productInput) as ProductInput;
        let totalPrice: number;
        if (deletedInput.discountUnit === "percent") {
            totalPrice = Math.round(deletedInput.price - (deletedInput.price * (deletedInput.discount / 100)));
        } else if (deletedInput.discountUnit === "flat") {
            totalPrice = Math.round(deletedInput.price - deletedInput.discount);
        }
        if (deletedInput.taxUnit === "percent") {
            totalPrice = Math.round(totalPrice + (totalPrice * (deletedInput.tax / 100)))
        } else if (deletedInput.taxUnit === "flat") {
            totalPrice = Math.round(totalPrice + deletedInput.tax);
        }
        await this.productModel.create({ ...deletedInput, totalPrice });
        return {
            success: true,
            message: "Product added successfully!"
        }
    }

    //Update Products
    async update(id: ObjectId, productUpdateInput: ProductUpdateInput): Promise<SuccessInfo> {
        const deletedInput = await omitEmpty(productUpdateInput) as ProductUpdateInput;
        let totalPrice: number;
        if (deletedInput?.discountUnit === "percent") {
            totalPrice = Math.round(deletedInput.price - (deletedInput.price * (deletedInput.discount / 100)));
        } else if (deletedInput.discountUnit === "flat") {
            totalPrice = Math.round(deletedInput.price - deletedInput.discount);
        }
        if (deletedInput.taxUnit === "percent") {
            totalPrice = Math.round(totalPrice + (totalPrice * (deletedInput.tax / 100)))
        } else if (deletedInput.taxUnit === "flat") {
            totalPrice = Math.round(totalPrice + deletedInput.tax);
        }
        const result = await this.productModel.findByIdAndUpdate(id, { ...deletedInput, totalPrice }, { new: true });
        if (!result) throw new NotFoundException("Product not found!");
        return {
            success: true,
            message: "Product updated successfully!"
        }
    }

    async updateView(id: ObjectId) {
        const result = await this.productModel.findByIdAndUpdate(id, {
            $inc: {
                view: 1
            }
        })
    }

    //Change Product Visibility
    async change(id: ObjectId, visibility: boolean): Promise<SuccessInfo> {
        const result = await this.productModel.findByIdAndUpdate(id, { visibility }, { new: true });
        if (!result) throw new NotFoundException("Product not found!");
        return {
            success: true,
            message: "Product visibility change successfully!"
        }
    }

    //Delete Product
    async delete(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.productModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Product not found!");
        return {
            success: true,
            message: "Product deleted successfully!"
        }
    }

    //Get product by batch
    async findProductByBatch(Ids: ObjectId[]): Promise<(Product | Error)[]> {
        const products = await this.productModel.find({ _id: { $in: Ids } });
        const mappedResults = Ids.map(
            (id) =>
                products.find((result) => result.id === id.toString())
        );
        return mappedResults;
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

//Schema
import { Category, CategoryDocument } from "./model/category.schema";
import { Subcategory, SubcategoryDocument } from "./model/sub-category.schema";

//Entities
import { SuccessInfo } from "src/user/entities/success.entity";

//Dto
import { CategoryInput } from "./dto/category.dto";
import { SubCategoryInput } from "./dto/sub-category.dto";
import { UpdateCateInput } from "./dto/update-category.dto";
import { UpdateSubInput } from "./dto/update-sub.dto";

@Injectable()
export class CategoryService {
    //Constructor
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Subcategory.name) private subcategoryModel: Model<SubcategoryDocument>
    ) { };

    //Get all category
    async categories() {
        const categories = await this.categoryModel.find();
        return categories;
    }

    //Get Single category
    async category(slug: string) {
        const category = await this.categoryModel.findOne({
            slug: slug
        });
        if (!category) throw new NotFoundException("Category not found!");
        return category;
    }

    //Get all subcategory service
    async subcategories() {
        const subcategories = await this.subcategoryModel.find();
        return subcategories;
    }

    //Get Single subcategory
    async subcategory(slug) {
        const subcategory = await this.subcategoryModel.findOne({
            slug: slug
        });
        if (!subcategory) throw new NotFoundException("Subcategory not found!");
        return subcategory;
    }

    //Add Category
    async createCate(categoryInput: CategoryInput): Promise<SuccessInfo> {
        Object.keys(categoryInput).forEach((key) => categoryInput[key] == '' && delete categoryInput[key]);
        const category = await this.categoryModel.findOne({
            name: categoryInput.name
        });
        if (category) throw new NotFoundException("Category already added!");
        await this.categoryModel.create(categoryInput);
        return {
            success: true,
            message: "Category added successfully!"
        }
    };

    //Add Sub-Category
    async createSub(subCateInput: SubCategoryInput): Promise<SuccessInfo> {
        Object.keys(subCateInput).forEach((key) => subCateInput[key] == '' && delete subCateInput[key]);
        const sub = await this.subcategoryModel.findOne({
            name: subCateInput.name,
            category: subCateInput.category
        });
        if (sub) throw new NotFoundException("Category already added!")
        const result = await this.subcategoryModel.create(subCateInput);
        await this.categoryModel.findByIdAndUpdate(subCateInput.category, {
            $push: {
                subCategory: result._id
            }
        })
        return {
            success: true,
            message: "Category added successfully!"
        }
    };

    //Update category
    async updateCate(updateCateInput: UpdateCateInput, id: ObjectId): Promise<SuccessInfo> {
        Object.keys(updateCateInput).forEach((key) => updateCateInput[key] == '' && delete updateCateInput[key]);
        const category = await this.categoryModel.findById(id);
        if (!category) throw new NotFoundException("Category not found!");
        if (category.name !== updateCateInput.name) {
            const hasCategory = await this.categoryModel.findOne({
                name: updateCateInput.name
            })
            if (hasCategory) throw new NotFoundException("Category name already in use!");
        }
        await this.categoryModel.findByIdAndUpdate(category._id, updateCateInput, { new: true });
        return {
            success: true,
            message: "Category updated successfully!"
        }
    };

    //Update sub category
    async updateSub(updateSubInput: UpdateSubInput, id: ObjectId): Promise<SuccessInfo> {
        Object.keys(updateSubInput).forEach((key) => updateSubInput[key] == '' && delete updateSubInput[key]);
        const subcategory = await this.subcategoryModel.findById(id);
        if (!subcategory) throw new NotFoundException("Sub-category not found!");
        if (subcategory.name !== updateSubInput.name) {
            const hasSub = await this.subcategoryModel.findOne({
                name: updateSubInput.name
            });
            if (hasSub) throw new NotFoundException("Sub-category already in use!");
        }
        await this.subcategoryModel.findByIdAndUpdate(subcategory._id, updateSubInput, { new: true });
        if (updateSubInput.category) {
            await this.categoryModel.findByIdAndUpdate(subcategory.category, {
                $pull: {
                    subCategory: subcategory._id
                }
            })
            await this.categoryModel.findByIdAndUpdate(updateSubInput.category, {
                $push: {
                    subCategory: subcategory._id
                }
            })
        }
        return {
            success: true,
            message: "Sub-category updated successfully!"
        }
    };

    //Delete category
    async deleteCate(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.categoryModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Category not found!");
        await this.subcategoryModel.deleteMany({
            category: id
        });
        return {
            success: true,
            message: "Category deleted successfully!"
        }
    }

    //Delete sub category
    async deleteSub(id: ObjectId): Promise<SuccessInfo> {
        const result = await this.subcategoryModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Sub category not found!");
        await this.categoryModel.findByIdAndUpdate(result.category, {
            $pull: {
                subCategory: id
            }
        });
        return {
            success: true,
            message: "Sub category deleted successfully!"
        }
    }

    //Get all category by batch service
    async findCategoryByBatch(Ids: ObjectId[]): Promise<(Category | Error)[]> {
        const categories = await this.categoryModel.find({ _id: { $in: Ids } });
        const mappedResults = Ids.map(
            (id) =>
                categories.find((result) => result.id === id.toString())
        );
        return mappedResults;
    }

    //Subcategory batch service
    async findSubCategoryByBatch(Ids: ObjectId[]): Promise<(Subcategory | Error)[]> {
        const categories = await this.subcategoryModel.find({ _id: { $in: Ids } });
        const mappedResults = Ids.map(
            (id) =>
                categories.find((result) => result.id === id.toString())
        );
        return mappedResults;
    }
}
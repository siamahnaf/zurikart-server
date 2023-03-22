import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Schemas
import { Product, ProductDocument } from "src/product/model/product.schema";
import { User, UserDocument } from "src/user/model/user.schema";

@Injectable()
export class DashService {
    //Constructor
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    //Get Dashboard
    async getDashboard() {
        const totalProduct = await this.productModel.countDocuments();
        const totalUser = await this.userModel.countDocuments({
            phone: {
                $ne: "8801611994403"
            }
        });
        return {
            totalProduct,
            totalUser
        }
    }
}
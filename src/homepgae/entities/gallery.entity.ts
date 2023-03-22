import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

//Date-scalar
import { DateScalar } from "src/date.scalar";

@ObjectType()
export class Gallery {
    @Field(() => ID, { nullable: false })
    id: ObjectId;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    url: string;
    @Field(() => String, { nullable: false })
    gallery: string;
    @Field(() => Date, { nullable: false })
    createdAt: DateScalar;
    @Field(() => Date, { nullable: false })
    updatedAt: DateScalar;
}
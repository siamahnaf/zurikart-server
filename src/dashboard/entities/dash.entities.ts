import { Field, ObjectType, Float } from "@nestjs/graphql";

@ObjectType()
export class Dashboard {
    @Field(() => Float, { nullable: true })
    totalProduct: number;
    @Field(() => Float, { nullable: true })
    totalUser: number;
}
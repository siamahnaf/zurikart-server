import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Articles {
    @Field(() => String, { nullable: false })
    description: string;
}
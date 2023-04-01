import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ArticlesInput {
    @Field(() => String, { nullable: false })
    description: string;
}
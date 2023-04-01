import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from "@nestjs/graphql";

import { BannerService } from "./banner.service";

import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { SuccessInfo } from "src/user/entities/success.entity";
import { DynamicBannerInput } from "./dto/banner.dto";
import { UseGuards } from "@nestjs/common";
import { DynamicBanner } from "./entities/banner.entity";
import { Sections } from "src/homepgae/entities/section.entity";
import { ArticlesInput } from "./dto/articles.dto";
import { Articles } from "./entities/articles.entity";

@Resolver(DynamicBanner)
export class BannerResolver {
    constructor(
        private readonly bannerService: BannerService
    ) { };

    @Query(() => [DynamicBanner], { name: "getDynamicBanners" })
    gets() {
        return this.bannerService.gets()
    }

    @Query(() => DynamicBanner, { name: "getSingleDynamic" })
    get(
        @Args("id") id: string
    ) {
        return this.bannerService.get(id);
    }

    @Query(() => Articles, { name: "getArticles" })
    articlesGet() {
        return this.bannerService.articlesGet();
    }

    @Mutation(() => SuccessInfo, { name: "addDynamicBanner" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("dynamicBannerInput") dynamicBannerInput: DynamicBannerInput
    ) {
        return this.bannerService.add(dynamicBannerInput)
    }

    @Mutation(() => SuccessInfo, { name: "updateDynamicBanner" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("dynamicBannerInput") dynamicBannerInput: DynamicBannerInput,
        @Args("id") id: string
    ) {
        return this.bannerService.update(dynamicBannerInput, id);
    }

    @Mutation(() => SuccessInfo, { name: "deleteDynamicBanners" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id") id: string
    ) {
        return this.bannerService.delete(id);
    }

    //Resolver field for sub category query
    @ResolveField('section', () => Sections, { nullable: true })
    getCategory(
        @Parent() dynamic: DynamicBanner,
        @Context() { loaders }: IGraphQLContext
    ) {
        return loaders.sectionLoader.load(dynamic.section);
    }

    @Mutation(() => SuccessInfo, { name: "saveArticles" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    articlesSave(
        @Args("articlesInput") articlesInput: ArticlesInput
    ) {
        return this.bannerService.articlesSave(articlesInput);
    }
}
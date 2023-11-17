import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BannerService } from './banner.service';
import { Banner } from './entities/banner.entity';
import { CreateBannerInput } from './dto/create-banner.input';
import { UpdateBannerInput } from './dto/update-banner.input';
import { RemoveBannerOutput } from './dto/remove-banner.output';

@Resolver(() => Banner)
export class BannerResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Mutation(() => Banner)
  createBanner(
    @Args('createBannerInput') createBannerInput: CreateBannerInput,
  ) {
    return this.bannerService.create(createBannerInput);
  }

  @Query(() => [Banner], { name: 'banners' })
  findAll() {
    return this.bannerService.findAll();
  }

  @Query(() => [Banner], { name: 'bannerByCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.findOneByCategory(id);
  }

  @Mutation(() => Banner)
  updateBanner(
    @Args('updateBannerInput') updateBannerInput: UpdateBannerInput,
  ) {
    return this.bannerService.update(updateBannerInput.id, updateBannerInput);
  }

  @Mutation(() => RemoveBannerOutput)
  removeBanner(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.remove(id);
  }
}

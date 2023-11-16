import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ResponseProduct } from './dto/response-product';
import {
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authorization/authorization.guard';
import { Role } from 'src/types/role.enum';
// import { Role } from 'src/types/role.enum';
// import { Roles } from 'src/decorators/roles/roles.decorator';
// import { UseGuards } from '@nestjs/common';
// import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
// import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  // @Roles(Role.Admin)
  // @UseGuards(AuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => ResponseProduct, { name: 'products' })
  findAll(
    @Args('q', { nullable: true }) q?: string,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
  ) {
    return this.productsService.findAll(
      !!q ? q : undefined,
      page === null ? 1 : page,
    );
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id, undefined);
  }

  @Query(() => Product, { name: 'productSlug' })
  findOneBySlug(@Args('slug') slug: string) {
    return this.productsService.findOne(undefined, slug);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Product, { name: 'removeProduct' })
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}

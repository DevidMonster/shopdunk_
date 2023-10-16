import { Injectable } from '@nestjs/common';
import { CreateProductImageInput } from './dto/create-product_image.input';
// import { UpdateProductImageInput } from './dto/update-product_image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product_image.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductSkus } from 'src/product_skus/entities/product_skus.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImage: Repository<ProductImage>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
    @InjectRepository(ProductSkus)
    private readonly productSkus: Repository<ProductSkus>,
  ) {}

  async create(
    createProductImageInput: CreateProductImageInput,
  ): Promise<ProductImage> {
    const product = createProductImageInput.producId
      ? await this.product.findOne({
          where: { id: createProductImageInput.producId },
        })
      : undefined;

    const productSku = createProductImageInput.producSkuId
      ? await this.productSkus.findOne({
          where: { id: createProductImageInput.producSkuId },
        })
      : undefined;

    const productImage = this.productImage.create({
      imageUrl: createProductImageInput.url,
      product: product,
      productSkus: productSku,
    });

    const result = await this.productImage.save(productImage);

    return result;
  }

  findAll() {
    return `This action returns all productImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  // update(id: number, updateProductImageInput: UpdateProductImageInput) {
  //   return `This action updates a #${id} productImage`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} productImage`;
  // }
}

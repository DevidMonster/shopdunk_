import { Injectable } from '@nestjs/common';
import { CreateProductImageInput } from './dto/create-product_image.input';
// import { UpdateProductImageInput } from './dto/update-product_image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product_image.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductSkus } from '../product_skus/entities/product_skus.entity';

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
  ): Promise<boolean> {
    for (const url of createProductImageInput.urls) {
      const product = createProductImageInput.producId
        ? await this.product.findOne({
            where: { id: createProductImageInput.producId },
          })
        : null;

      const productSku = createProductImageInput.producSkuId
        ? await this.productSkus.findOne({
            where: { id: createProductImageInput.producSkuId },
          })
        : null;

      const productImage = this.productImage.create({
        imageUrl: url,
        product: product,
        productSkus: productSku,
      });

      await this.productImage.save(productImage);
    }
    return true;
  }

  async findAll(): Promise<ProductImage[]> {
    return await this.productImage.find({
      relations: { product: true, productSkus: true },
    });
  }

  async findAllByProductId(id: number): Promise<ProductImage[]> {
    const query = this.productImage
      .createQueryBuilder('productImage')
      .leftJoinAndSelect('productImage.product', 'product')
      .where('product.id = :id', { id })
      .andWhere('productImage.productSkus IS NULL'); // Lọc để chỉ lấy productSkus không null

    const images = await query.getMany();

    return images;
  }

  async findOne(id: number): Promise<ProductImage> {
    return await this.productImage.findOne({
      where: { id: id },
      relations: { product: true, productSkus: true },
    });
  }

  // update(id: number, updateProductImageInput: UpdateProductImageInput) {
  //   return `This action updates a #${id} productImage`;
  // }

  async removeByProductId(id: number) {
    const productImages = await this.productImage.find({
      where: { product: { id: id } },
    });

    for (const productImage of productImages) {
      await this.productImage.remove(productImage);
    }

    return true;
  }
}

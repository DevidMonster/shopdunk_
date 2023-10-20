import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductSkusInput } from './dto/create-product_skus.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSkus } from './entities/product_skus.entity';
import { SkuValue } from '../sku_values/entities/sku_value.entity';
import { SkuValuesService } from '../sku_values/sku_values.service';
import { ProductImagesService } from '../product_images/product_images.service';
// import { UpdateProductSkusInput } from './dto/update-product_skus.input';

@Injectable()
export class ProductSkusService {
  constructor(
    @InjectRepository(ProductSkus)
    private readonly productSku: Repository<ProductSkus>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
    private skuValueService: SkuValuesService,
    private productImage: ProductImagesService,
  ) { }

  async create(
    createProductSkusInput: CreateProductSkusInput,
  ): Promise<ProductSkus> {
    const product = await this.product.findOne({
      where: { id: createProductSkusInput.productId },
    });

    const productSku = this.productSku.create({
      price: createProductSkusInput.price,
      product,
      quantity: createProductSkusInput.quantity,
      status: createProductSkusInput.status,
      sku: createProductSkusInput.sku,
    });

    const result = await this.productSku.save(productSku);

    await this.productImage.create({
      urls: createProductSkusInput.images || [],
      producId: product.id,
      producSkuId: result.id,
    });

    return result;
  }

  findAll() {
    return `This action returns all productSkus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSkus`;
  }

  // update(id: number, updateProductSkusInput: UpdateProductSkusInput) {
  //   return `This action updates a #${id} productSkus`;
  // }

  async remove(id: number): Promise<ProductSkus> {
    const productSku = await this.productSku.findOne({
      where: { id: id },
      relations: { skuValues: true },
    });

    if (!productSku) {
      throw new NotFoundException('No productSku found');
    }

    for (const value of productSku.skuValues) {
      console.log(value);
      await this.skuValueService.remove(value.id);
    }

    await this.productSku.remove(productSku);

    return productSku;
  }
}

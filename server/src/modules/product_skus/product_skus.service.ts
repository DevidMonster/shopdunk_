import { Injectable } from '@nestjs/common';
import { CreateProductSkusInput } from './dto/create-product_skus.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSkus } from './entities/product_skus.entity';
// import { UpdateProductSkusInput } from './dto/update-product_skus.input';

@Injectable()
export class ProductSkusService {
  constructor(
    @InjectRepository(ProductSkus)
    private readonly productSku: Repository<ProductSkus>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
  ) {}

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

  // remove(id: number) {
  //   return `This action removes a #${id} productSkus`;
  // }
}

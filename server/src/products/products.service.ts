import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { OptionsService } from 'src/options/options.service';
import { ProductSkusService } from 'src/product_skus/product_skus.service';
import { Option } from 'src/options/entities/option.entity';
import { SkuValuesService } from 'src/sku_values/sku_values.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly product: Repository<Product>,
    private readonly optionService: OptionsService,
    private readonly productSkuService: ProductSkusService,
    private readonly skuValueService: SkuValuesService,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.product.create({
      name: createProductInput.name,
      price: createProductInput.price,
      description: createProductInput.description,
    });

    const newProduct = await this.product.save(product);

    const optionResults: Option[] = [];

    for (const option of createProductInput.options) {
      const result = await this.optionService.create({
        optionName: option.optionName,
        productId: newProduct.id,
        optionValues: option.optionValues,
      });
      optionResults.push(result);
    }

    for (const sku of createProductInput.skuValues) {
      const prdSku = await this.productSkuService.create({
        images: sku.images || [],
        price: sku.price,
        productId: newProduct.id,
        quantity: sku.quantity,
        sku: sku.sku,
        status: sku.status,
      });

      for (const option of optionResults) {
        for (const optionValue of option.optionValues) {
          if (
            sku.sku_name
              .toLowerCase()
              .match(optionValue.valueName.toLowerCase())
          ) {
            await this.skuValueService.create({
              optionId: option.id,
              skuId: prdSku.id,
              valueId: optionValue.id,
            });
          }
        }
      }
    }

    return newProduct;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}

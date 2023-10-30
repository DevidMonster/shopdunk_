/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { OptionsService } from 'src/modules/options/options.service';
import { ProductSkusService } from 'src/modules/product_skus/product_skus.service';
import { Option } from 'src/modules/options/entities/option.entity';
import { SkuValuesService } from 'src/modules/sku_values/sku_values.service';
import { Category } from '../categories/entities/category.entity';
import { CreateOptionValueInput } from '../option_values/dto/create-option_value.input';
import { ProductImagesService } from '../product_images/product_images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly product: Repository<Product>,
    @InjectRepository(Category) private readonly category: Repository<Category>,
    private readonly optionService: OptionsService,
    private readonly productSkuService: ProductSkusService,
    private readonly skuValueService: SkuValuesService,
    private readonly productImage: ProductImagesService,
  ) { }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const category = await this.category.findOne({
      where: { id: createProductInput.categoryId },
    });

    const product = this.product.create({
      name: createProductInput.name,
      price: createProductInput.price,
      discount: createProductInput.discount,
      description: createProductInput.description,
      category,
    });

    const newProduct = await this.product.save(product);

    await this.productImage.create({
      urls: createProductInput.images || [],
      producId: newProduct.id
    });

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

  async findAll(): Promise<Product[]> {
    const products = await this.product.find({
      where: { productSkus: !null },
      relations: {
        options: { optionValues: true },
        category: true,
        images: {
          product: true,
        },
        productSkus: {
          images: {
            product: true,
            productSkus: true,
          },
          skuValues: {
            option: true,
            optionValue: true,
            sku: true,
          },
        },
      },
    });



    if (!products) {
      throw new NotFoundException('Get products failed');
    }

    const result = await Promise.all(products.map(async (product) => (
      {
        ...product,
        images: await this.productImage.findAllByProductId(product.id)
      }
    )))

    return result as Product[];
  }

  async findOne(id: number | undefined, slug: string | undefined): Promise<Product> {
    const product = await this.product.findOne({
      where: id && !slug ? { id: id, productSkus: !null } : { slug: slug, productSkus: !null },
      relations: {
        options: { optionValues: true },
        category: true,
        images: {
          product: true,
        },
        productSkus: {
          images: {
            product: true,
            productSkus: true,
          },
          skuValues: {
            option: true,
            optionValue: true,
            sku: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }

    product.images = await this.productImage.findAllByProductId(product.id)

    return product;
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.product.findOne({
      where: { id: id },
      relations: {
        options: {
          optionValues: true,
        },
        productSkus: {
          skuValues: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }

    product.name = updateProductInput.name;
    product.price = updateProductInput.price;
    product.discount = updateProductInput.discount;
    product.description = updateProductInput.description;

    if (updateProductInput.categoryId) {
      const category = await this.category.findOne({
        where: { id: updateProductInput.categoryId },
      });
      if (category) {
        product.category = category;
      }
    }

    //cập nhật ảnh
    await this.productImage.removeByProductId(product.id)
    await this.productImage.create({
      urls: updateProductInput.images || [],
      producId: product.id
    });

    const updatedProduct = await this.product.save(product);

    if (updateProductInput.options || updateProductInput.skuValues) {
      // console.log(product,"==================", updateProductInput);

      for (const sku of product.productSkus) {
        await this.productSkuService.remove(sku.id);
      }

      for (const option of product.options) {
        await this.optionService.remove(option.id);
      }

      const optionResults: Option[] = [];

      for (const option of updateProductInput.options) {
        const result = await this.optionService.create({
          optionName: option.optionName,
          productId: updateProductInput.id,
          optionValues: option.optionValues as CreateOptionValueInput[],
        });
        optionResults.push(result);
      }

      for (const sku of updateProductInput.skuValues) {
        const prdSku = await this.productSkuService.create({
          images: sku.images || [],
          price: sku.price,
          productId: updateProductInput.id,
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
    }

    return updatedProduct;
  }

  async remove(id: number): Promise<Product> {
    const product = await this.product.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }

    await this.product.remove(product);

    return product;
  }
}

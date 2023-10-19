import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkuValueInput } from './dto/create-sku_value.input';
import { InjectRepository } from '@nestjs/typeorm';
import { SkuValue } from './entities/sku_value.entity';
import { Repository } from 'typeorm';
import { Option } from 'src/modules/options/entities/option.entity';
import { OptionValue } from 'src/modules/option_values/entities/option_value.entity';
import { ProductSkus } from 'src/modules/product_skus/entities/product_skus.entity';
// import { UpdateSkuValueInput } from './dto/update-sku_value.input';

@Injectable()
export class SkuValuesService {
  constructor(
    @InjectRepository(SkuValue) private readonly skuValue: Repository<SkuValue>,
    @InjectRepository(Option) private readonly option: Repository<Option>,
    @InjectRepository(ProductSkus)
    private readonly productSku: Repository<ProductSkus>,
    @InjectRepository(OptionValue)
    private readonly optionValue: Repository<OptionValue>,
  ) {}

  async create(createSkuValueInput: CreateSkuValueInput): Promise<SkuValue> {
    const option = await this.option.findOne({
      where: { id: createSkuValueInput.optionId },
    });
    const sku = await this.productSku.findOne({
      where: { id: createSkuValueInput.skuId },
    });
    const optionValue = await this.optionValue.findOne({
      where: { id: createSkuValueInput.valueId },
    });
    const skuValue = this.skuValue.create({
      option,
      optionValue,
      sku,
    });

    const result = await this.skuValue.save(skuValue);

    return result;
  }

  findAll() {
    return this.skuValue.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} skuValue`;
  }

  // update(id: number, updateSkuValueInput: UpdateSkuValueInput) {
  //   return `This action updates a #${id} skuValue`;
  // }

  async remove(id: number): Promise<SkuValue> {
    const skuValue = await this.skuValue.findOne({
      where: { id: id }
    });

    if (!skuValue) {
      throw new NotFoundException('No skuValue found');
    }

    await this.skuValue.remove(skuValue);

    return skuValue;
  }
}

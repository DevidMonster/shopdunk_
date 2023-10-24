import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { OptionValuesService } from 'src/modules/option_values/option_values.service';
// import { UpdateOptionInput } from './dto/update-option.input';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option) private readonly option: Repository<Option>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
    private readonly optionValueService: OptionValuesService,
  ) { }

  async create(createOptionInput: CreateOptionInput) {
    const product = await this.product.findOne({
      where: { id: createOptionInput.productId },
    });

    const option = this.option.create({
      optionName: createOptionInput.optionName,
      product: product,
    });

    const newOption = await this.option.save(option);

    for (const optionValue of createOptionInput.optionValues) {
      await this.optionValueService.create({
        optionId: newOption.id,
        valueName: optionValue.valueName,
      });
    }

    const result = await this.option.findOne({
      where: { id: newOption.id },
      relations: { optionValues: true },
    });

    return result;
  }

  findAll() {
    return `This action returns all options`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  // update(id: number, updateOptionInput: UpdateOptionInput) {
  //   return `This action updates a #${id} option`;
  // }

  async remove(id: number): Promise<Option> {
    const option = await this.option.findOne({
      where: { id: id },
      relations: { optionValues: true },
    });

    if (!option) {
      throw new NotFoundException('No option found');
    }

    for (const optionValue of option.optionValues) {
      await this.optionValueService.remove(optionValue.id);
    }

    await this.option.remove(option);

    return option;
  }
}

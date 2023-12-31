import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionValueInput } from './dto/create-option_value.input';
// import { UpdateOptionValueInput } from './dto/update-option_value.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionValue } from './entities/option_value.entity';
import { Repository } from 'typeorm';
import { Option } from 'src/modules/options/entities/option.entity';

@Injectable()
export class OptionValuesService {
  constructor(
    @InjectRepository(OptionValue)
    private readonly optionValue: Repository<OptionValue>,
    @InjectRepository(Option)
    private readonly option: Repository<Option>,
  ) { }

  async create(createOptionValueInput: CreateOptionValueInput) {
    const option = await this.option.findOne({
      where: { id: createOptionValueInput.optionId },
    });

    const optionValue = this.optionValue.create({
      valueName: createOptionValueInput.valueName,
      option,
    });

    const newOptionValue = await this.optionValue.save(optionValue);

    return newOptionValue;
  }

  findAll() {
    return `This action returns all optionValues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionValue`;
  }

  // update(id: number, updateOptionValueInput: UpdateOptionValueInput) {
  //   return `This action updates a #${id} optionValue`;
  // }

  async remove(id: number): Promise<OptionValue> {
    const optionValue = await this.optionValue.findOne({ where: { id: id } });

    if (!optionValue) {
      throw new NotFoundException('No optionValue found');
    }

    await this.optionValue.remove(optionValue);

    return optionValue;
  }
}

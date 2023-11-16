import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscountCodeInput } from './dto/create-discount_code.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountCode } from './entities/discount_code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountCodeService {
  constructor(
    @InjectRepository(DiscountCode)
    private discountCode: Repository<DiscountCode>,
  ) {}

  async createDiscountCode(
    discountCodeDTO: CreateDiscountCodeInput,
  ): Promise<DiscountCode> {
    // Kiểm tra xem mã đã tồn tại chưa
    const existingDiscountCode = await this.discountCode.findOne({
      where: { code: discountCodeDTO.code },
    });

    if (existingDiscountCode) {
      // Nếu mã đã tồn tại, trả về một thông báo
      throw new HttpException('Mã Code đã tồn tại', HttpStatus.CONFLICT);
    }
    const newDiscountCode = this.discountCode.create(discountCodeDTO);
    return await this.discountCode.save(newDiscountCode);
  }

  async getAllDiscountCodes(): Promise<DiscountCode[]> {
    return await this.discountCode.find();
  }

  async getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined> {
    const discount_code = await this.discountCode.findOne({ where: { code } });

    if (!discount_code) {
      // Nếu mã không tồn tại, trả về một thông báo
      throw new HttpException('Mã Code không tồn tại', HttpStatus.NOT_FOUND);
    }

    return discount_code;
  }

  async deleteDiscountCode(id: number): Promise<boolean> {
    const existingDiscountCode = await this.discountCode.findOne({
      where: { id: id },
    });

    if (!existingDiscountCode) {
      // Nếu mã không tồn tại, trả về false hoặc có thể ném một exception
      throw new HttpException('Mã Code không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.discountCode.remove(existingDiscountCode);
    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateBannerInput } from './dto/create-banner.input';
import { UpdateBannerInput } from './dto/update-banner.input';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}
  async create(createBannerInput: CreateBannerInput) {
    const newBanner = await this.bannerRepository.create(createBannerInput);
    return this.bannerRepository.save(newBanner);
  }

  findAll() {
    return this.bannerRepository.find({ relations: ['category'] });
  }

  findOneByCategory(id: number) {
    return this.bannerRepository.find({
      where: { categoryId: id },
      relations: ['category'],
    });
  }

  update(id: number, updateBannerInput: UpdateBannerInput) {
    return `This action updates a #${id} banner`;
  }

  async remove(id: number) {
    const checkRemove = await this.bannerRepository.findOne({
      where: { id: id },
    });
    if (!checkRemove) {
      return { message: `Không tìm thấy banner số ${id}` };
    }
    await this.bannerRepository.delete(id);
    return { message: `Xóa banner số ${id} thành công` };
  }
}

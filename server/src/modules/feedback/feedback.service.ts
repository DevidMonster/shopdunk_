import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createFeedbackInput: CreateFeedbackInput) {
    const { productId } = createFeedbackInput;
    const findProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    // console.log(findProduct, 'findProduct');
    if (!findProduct) {
      throw new Error('Product not found');
    }
    const newFeedback = await this.feedbackRepository.create({
      ...createFeedbackInput,
    });
    return this.feedbackRepository.save(newFeedback);
  }

  findAll() {
    return this.feedbackRepository.find({ relations: ['product'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  findByProduct(id: number) {
    return this.feedbackRepository.find({
      where: { productId: id },
      relations: ['product'],
    });
  }

  update(id: number, updateFeedbackInput: UpdateFeedbackInput) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Product } from '../products/entities/product.entity';
import { log } from 'console';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async create(createCommentInput: CreateCommentInput) {
    const productId = await this.products.findOne({
      where: { id: createCommentInput.productId },
    });
    console.log(productId);
    if (!productId) {
      throw new Error('Product not found');
    }
    const newComment = this.commentRepository.create({
      ...createCommentInput,
    });
    return this.commentRepository.save(newComment);
  }

  findAll() {
    return this.commentRepository.find({
      relations: ['product'],
    });
  }

  async findOnebyProduct(id: number) {
    console.log(id);
    const findCmtbyProduct = await this.commentRepository.find({
      where: { productId: id },
      relations: ['product'],
    });
    if (findCmtbyProduct.length === 0) {
      throw new Error('Comment not found');
    }

    log('findCmtbyProduct', findCmtbyProduct);
    return findCmtbyProduct;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Product } from '../products/entities/product.entity';
import { log } from 'console';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: TreeRepository<Comment>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async create(createCommentInput: CreateCommentInput) {
    const productId = await this.products.findOne({
      where: { id: createCommentInput.productId },
    });
    if (!productId) {
      throw new Error('Product not found');
    }
    let parentComment = null;
    if (createCommentInput.parent_comment) {
      parentComment = await this.commentRepository.findOne({
        where: { id: createCommentInput.parent_comment },
      });
      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
    }

    const newComment = this.commentRepository.create({
      ...createCommentInput,
      parent_comment: parentComment,
    });
    return this.commentRepository.save(newComment);
  }

  async findAll() {
    const findAll = await this.commentRepository.findTrees({
      relations: ['product'],
    });
    console.log('findAll', findAll);
    return findAll;
  }

  async findOnebyProduct(id: number) {
    // console.log(id);

    const allComment = await this.commentRepository.find({
      where: { productId: id },
      relations: ['product'],
    });
    log('allComment', allComment);
    if (allComment.length === 0) {
      throw new Error('Comment not found');
    }
    const cmtParant = allComment?.filter((cmt) => cmt.level == 0);
    const cmtByProductPromises = cmtParant?.map(async (root) => {
      if (root.level == 0) {
        const children = await this.commentRepository.findDescendantsTree(root);
        return children;
      }
    });
    const cmtByProduct = await Promise.all(cmtByProductPromises);
    return cmtByProduct;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

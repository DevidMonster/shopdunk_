import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { PubSub } from 'graphql-subscriptions';
import { UpdateCommentInput } from './dto/update-comment.input';

const pubSub = new PubSub();

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const comment = await this.commentService.create(createCommentInput);
    // console.log('comment', comment);
    const findCommentNewByProduct = await this.commentService.findOnebyProduct(
      comment.productId,
    );

    pubSub.publish('commentAdded', { commentAdded: findCommentNewByProduct });
    return comment;
  }

  @Query(() => [Comment], { name: 'comment' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => [Comment], { name: 'commentByProduct' })
  findOnebyProduct(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOnebyProduct(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }

  @Subscription(() => [Comment])
  commentAdded() {
    return pubSub.asyncIterator('commentAdded');
  }
}

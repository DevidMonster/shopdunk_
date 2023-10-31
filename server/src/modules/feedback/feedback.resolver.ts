import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Mutation(() => Feedback, { name: 'createFeedback' })
  createFeedback(
    @Args('createFeedbackInput') createFeedbackInput: CreateFeedbackInput,
  ) {
    return this.feedbackService.create(createFeedbackInput);
  }

  @Query(() => [Feedback], { name: 'feedbackAll' })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Query(() => Feedback, { name: 'feedback' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.feedbackService.findOne(id);
  }

  @Query(() => [Feedback], { name: 'feedbackByProduct' })
  findByProduct(@Args('id', { type: () => Int }) id: number) {
    return this.feedbackService.findByProduct(id);
  }

  @Mutation(() => Feedback)
  updateFeedback(
    @Args('updateFeedbackInput') updateFeedbackInput: UpdateFeedbackInput,
  ) {
    return this.feedbackService.update(
      updateFeedbackInput.id,
      updateFeedbackInput,
    );
  }

  @Mutation(() => Feedback)
  removeFeedback(@Args('id', { type: () => Int }) id: number) {
    return this.feedbackService.remove(id);
  }
}

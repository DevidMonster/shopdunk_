import { CreateProductSkusInput } from './create-product_skus.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductSkusInput extends PartialType(
  CreateProductSkusInput,
) {
}

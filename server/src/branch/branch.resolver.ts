import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BranchService } from './branch.service';
import { Branch } from './entities/branch.entity';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';
import {
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authorization/authorization.guard';
import { Role } from 'src/types/role.enum';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Branch)
  createBranch(
    @Args('createBranchInput') createBranchInput: CreateBranchInput,
  ) {
    return this.branchService.create(createBranchInput);
  }

  @Query(() => [Branch], { name: 'branchs' })
  findAll() {
    return this.branchService.findAll();
  }

  @Query(() => Branch, { name: 'branch' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Branch)
  updateBranch(
    @Args('updateBranchInput') updateBranchInput: UpdateBranchInput,
  ) {
    return this.branchService.update(updateBranchInput.id, updateBranchInput);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Mutation(() => Branch)
  removeBranch(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.remove(id);
  }
}

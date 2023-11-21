import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchResolver } from './branch.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, User])],
  providers: [BranchResolver, BranchService],
})
export class BranchModule {}

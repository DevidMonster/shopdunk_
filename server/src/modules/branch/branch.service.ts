import { Injectable } from '@nestjs/common';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchService {
  constructor(@InjectRepository(Branch) private branch: Repository<Branch>) {}

  async create(createBranchInput: CreateBranchInput) {
    const branch = this.branch.create(createBranchInput);
    return await this.branch.save(branch);
  }

  async findAll() {
    return await this.branch.find();
  }

  async findOne(id: number) {
    return await this.branch.findOne({ where: { id: id } });
  }

  async update(id: number, updateBranchInput: UpdateBranchInput) {
    const newBranch = await this.branch.findOne({ where: { id: id } });
    newBranch.address = updateBranchInput.address;
    newBranch.branchName = updateBranchInput.branchName;
    newBranch.code = updateBranchInput.code;
    newBranch.provinceCode = updateBranchInput.provinceCode;
    return await this.branch.save(newBranch);
  }

  async remove(id: number) {
    const branch = await this.branch.findOne({ where: { id: id } });
    await this.branch.remove(branch);
    return branch;
  }
}

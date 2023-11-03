import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async findAllUsers(
    page: number = 1,
    pageSize: number = 1000,
  ): Promise<User[]> {
    const options: FindManyOptions<User> = {
      // Chọn các relations cần thiết
    };

    // Thêm phân trang nếu cung cấp page và pageSize
    if (page && pageSize) {
      options.skip = (page - 1) * pageSize;
      options.take = pageSize;
    }

    const users = await this.user.find(options);
    if (!users) throw new HttpException('No users found', HttpStatus.NOT_FOUND);

    return users;
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.user.findOne({
      where: { id },
    });

    if (!user) throw new HttpException('No user found', HttpStatus.NOT_FOUND);

    return user;
  }

  async updateUser(id: number, userInfo: UpdateUserInput): Promise<User> {
    const user = await this.user.findOne({ where: { id } });
    userInfo.password = user.password;

    if (userInfo.password !== null) {
      userInfo.password = await bcrypt.hash(userInfo.password, 10);
    }
    await this.user.update(id, userInfo);

    return user;
  }

  async createUser(userInfo: CreateUserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(userInfo.password, 10);
    if (userInfo.password !== userInfo.confirmPassword) {
      throw new HttpException('Password is not match', HttpStatus.BAD_REQUEST);
    }
    delete userInfo.confirmPassword;
    const user = this.user.create({ ...userInfo, password: hashPassword });

    await this.user.save(user);

    return user;
  }
}

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

    if (userInfo.password) {
      userInfo.password = await bcrypt.hash(userInfo.password, 10);
    } else {
      userInfo.password = user.password;
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
    const user = this.user.create({
      ...userInfo,
      password: hashPassword,
      avatar:
        userInfo.avatar !== null || userInfo.avatar
          ? userInfo.avatar
          : 'https://firebasestorage.googleapis.com/v0/b/cloud-app-b7625.appspot.com/o/product_images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=b03a15d3-3ad1-45ae-a982-75503482d8ec&_gl=1*182p1sq*_ga*MjAxMjA3Nzc0MS4xNjkzOTgzNjYw*_ga_CW55HF8NVT*MTY5ODY0MDU2Ny4xMy4xLjE2OTg2NDA2MzUuNTYuMC4w',
    });

    await this.user.save(user);

    return user;
  }
}

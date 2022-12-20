import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { ResponseUserDto } from './dto/response-user.dto';

import { User } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { Reset } from './entities/reset.entity';
import { time } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const saltOrRounds = await genSalt();
    const passwordTemp = await hash(createUserDto.password, saltOrRounds);
    createUserDto.password = passwordTemp;
    const user = await this.userRepo.save(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async findAll(query) {
    const take = query.take;
    const page = query.page;
    const skip = (page - 1) * take;

    const [result, total] = await this.userRepo.findAndCount({
      // where: { questionname: Like('%' + keyword + '%') }, //order: { questionname: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepo.findOneBy({ id: parseInt(id) });
  }
  async findOneName(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email: email });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    updateUserDto['userId'] = id;
    return await this.userRepo.save(updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async createKey(id: number) {
    let random = (Math.random() * 10 + 1).toString(36).substring(1);
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Reset)
      .values({ key: random, userId: id })
      .execute();
    return 'success';
  }
  async reset(token: string, password: string) {
    const rest = await this.dataSource
      .getRepository(Reset)
      .createQueryBuilder('reset')
      .where('reset.key = :key', { key: token })
      .getOne();

    const createdTime = Date.UTC(
      rest.createdDate.getUTCFullYear(),
      rest.createdDate.getUTCMonth(),
      rest.createdDate.getUTCDate(),
      rest.createdDate.getUTCHours(),
      rest.createdDate.getUTCMinutes(),
      rest.createdDate.getUTCSeconds(),
    );

    const today = Date.now();
    if ((today - createdTime) / 1000 < 15 * 60) {
      const saltOrRounds = await genSalt();
      const passwordTemp = await hash(password, saltOrRounds);
      await this.dataSource
        .createQueryBuilder()
        .update(User)
        .set({ password: passwordTemp })
        .where('id = :id', { id: rest.userId })
        .execute();
      return 'Success';
    } else return 'Token Has Expired';
  }
}

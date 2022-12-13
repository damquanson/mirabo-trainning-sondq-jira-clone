import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { ResponseUserDto } from './dto/response-user.dto';

import { User } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

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
}

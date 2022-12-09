import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepo.save(createTaskDto);
  }

  async findAll(query) {
    const take = query.take;
    const page = query.page;
    const skip = (page - 1) * take;

    const [result, total] = await this.taskRepo.findAndCount({
      // where: { questionname: Like('%' + keyword + '%') }, //order: { questionname: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepo.findOneBy({ id: id });
  }

  async update(id: number, updateTaskDto: CreateTaskDto): Promise<Task> {
    updateTaskDto['id'] = id;
    return await this.taskRepo.save(updateTaskDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}

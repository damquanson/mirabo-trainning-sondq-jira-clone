import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';

import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}
  create(createTaskDto: createTaskDto) {
    return this.taskRepo.save(createTaskDto);
  }

  async findAllByProject(query, projectId) {
    const take = query.take;
    const page = query.page;
    const skip = (page - 1) * take;

    const [result, total] = await this.taskRepo.findAndCount({
      where: { projectId: projectId }, //order: { questionname: "DESC" },
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

  async update(
    id: number,
    updateTaskDto: createTaskDto,
  ): Promise<UpdateResult> {
    return await this.taskRepo.update(id, updateTaskDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}

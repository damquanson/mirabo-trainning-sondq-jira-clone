import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { updateSubTaskDto } from '../sub-task/dto/update-sub-task.dto';
import { User } from '../user/entities/user.entity';
import { createTaskDto } from './dto/create-task.dto';

import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private mailServices: MailerService,
  ) {}
  async create(createTaskDto: createTaskDto) {
    const member = await this.userRepo.findOneBy({
      id: createTaskDto.assigneeId,
    });
    await this.mailServices.sendMail({
      to: member.email,
      from: 'damquanson@gmail.com',
      subject: ' You have a new Task  ',
      text: ' Task Description: ' + createTaskDto.content,
    });
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
  ): Promise<createTaskDto> {
    await this.taskRepo.update(id, updateTaskDto);
    return updateTaskDto;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}

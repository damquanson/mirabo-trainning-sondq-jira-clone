import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { Task } from '../task/entities/task.entity';
import { createSubTaskDto } from './dto/create-sub-task.dto';
import { updateSubTaskDto } from './dto/update-sub-task.dto';

import { SubTask } from './entities/sub-task.entity';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTask) private subTaskRepo: Repository<SubTask>,
    @InjectRepository(Task) private TaskRepo: Repository<Task>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}
  async create(createSubTaskDto: createSubTaskDto): Promise<SubTask> {
    return await this.subTaskRepo.save(createSubTaskDto);
  }

  async findAllByTask(query, taskId) {
    const take = query.take;
    const page = query.page;
    const skip = (page - 1) * take;

    const [result, total] = await this.subTaskRepo.findAndCount({
      where: { taskId: taskId }, //order: { questionname: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findSubTask(id: number) {
    const comment = await this.commentRepo.findOneBy({
      taskOrSubtaskId: id,
      isTask: false,
    });
    const subTask = await this.subTaskRepo.findOneBy({ id: id });
    const response = { subTaskInfo: subTask, comment: comment };
    return response;
  }
  async findTaskAssignee(id: number): Promise<SubTask> {
    return await this.subTaskRepo.findOneBy({ assigneeId: id });
  }

  async update(
    id: number,
    updateSubTaskDto: updateSubTaskDto,
  ): Promise<updateSubTaskDto> {
    await this.subTaskRepo.update(id, updateSubTaskDto);
    return updateSubTaskDto;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.subTaskRepo.delete(id);
  }
  async setLogWork(idSubTask: number, time: number): Promise<SubTask> {
    let subTask = await this.subTaskRepo.findOneBy({ id: idSubTask });
    const change = time - subTask.logwork;

    let task = await this.TaskRepo.findOneBy({ id: subTask.taskId });
    task.logWork += change;
    this.TaskRepo.save(task);
    subTask.logwork = time;
    return this.subTaskRepo.save(subTask);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/entities/task.entity';
import { createSubTaskDto } from './dto/create-sub-task.dto';

import { SubTask } from './entities/sub-task.entity';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTask) private subTaskRepo: Repository<SubTask>,
    @InjectRepository(Task) private TaskRepo: Repository<Task>,
  ) {}
  async create(createSubTaskDto: createSubTaskDto): Promise<SubTask> {
    return await this.subTaskRepo.save(createSubTaskDto);
  }

  async findAllByTask(query, projectId) {
    const take = query.take;
    const page = query.page;
    const skip = (page - 1) * take;

    const [result, total] = await this.subTaskRepo.findAndCount({
      where: { projectId: projectId }, //order: { questionname: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  findTaskAssignee(id: number) {
    return this.subTaskRepo.findOneBy({ assigneeId: id });
  }

  update(id: number, updateSubTaskDto: createSubTaskDto) {
    return this.subTaskRepo.update(id, updateSubTaskDto);
  }

  remove(id: number) {
    return this.subTaskRepo.delete(id);
  }
  async setLogWork(idSubTask: number, time: number) {
    let subTask = await this.subTaskRepo.findOneBy({ id: idSubTask });
    const change = time - subTask.logwork;

    let Task = await this.TaskRepo.findOneBy({ id: subTask.taskId });
    Task.logWork += change;
    this.TaskRepo.save(Task);
    subTask.logwork = time;
    return this.subTaskRepo.save(subTask);
  }
}

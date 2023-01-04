import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/create-task.dto';

import { Task } from './entities/task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: createTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAllByProject(
    @Query('page') page: number,
    @Query('projectId') projectId: number,
  ) {
    const query = {
      take: 5, // so luong ket qua trong 1 trang
      page: page,
    };

    return this.taskService.findAllByProject(query, projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: createTaskDto,
  ): Promise<createTaskDto> {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.remove(+id);
  }
}

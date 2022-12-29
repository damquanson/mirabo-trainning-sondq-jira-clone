import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { createSubTaskDto } from './dto/create-sub-task.dto';
import { updateSubTaskDto } from './dto/update-sub-task.dto';
import { SubTask } from './entities/sub-task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('subtask')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Post()
  create(@Body() createSubTaskDto: createSubTaskDto): Promise<SubTask> {
    return this.subTaskService.create(createSubTaskDto);
  }

  @Get('details/:id')
  findSubTask(@Param('id') id: number) {
    return this.subTaskService.findSubTask(id);
  }
  @Get()
  findAllByTask(@Query('page') page: number, @Query('taskId') taskId: number) {
    const pagination = {
      take: 5, // so luong ket qua trong 1 trang
      page: page,
    };

    return this.subTaskService.findAllByTask(pagination, taskId);
  }

  @Get(':userId')
  findTaskAssignee(@Param('userId') userId: number): Promise<SubTask> {
    return this.subTaskService.findTaskAssignee(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSubTaskDto: updateSubTaskDto,
  ): Promise<UpdateResult> {
    return this.subTaskService.update(id, updateSubTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.subTaskService.remove(id);
  }
  @Post('logwork')
  logwork(@Body() body): Promise<SubTask> {
    return this.subTaskService.setLogWork(body.id, body.time);
  }
}

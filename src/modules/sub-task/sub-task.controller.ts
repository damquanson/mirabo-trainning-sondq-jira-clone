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
import { time } from 'console';

@Controller('subtask')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Post()
  create(@Body() createSubTaskDto: createSubTaskDto) {
    return this.subTaskService.create(createSubTaskDto);
  }

  @Get()
  findAllByTask(@Query('page') page: number, @Query('tid') tid: number) {
    const pagination = {
      take: 5, // so luong ket qua trong 1 trang
      page: page,
    };

    return this.subTaskService.findAllByTask(pagination, tid);
  }

  @Get(':userId')
  findTaskAssignee(@Param('userId') userId: number) {
    return this.subTaskService.findTaskAssignee(userId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSubTaskDto: createSubTaskDto) {
    return this.subTaskService.update(id, updateSubTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subTaskService.remove(id);
  }
  @Post('logwork')
  logwork(@Body() body) {
    return this.subTaskService.setLogWork(body.id, body.time);
  }
}

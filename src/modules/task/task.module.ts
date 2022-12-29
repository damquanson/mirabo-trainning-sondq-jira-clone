import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([User])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

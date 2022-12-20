import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTask } from './entities/sub-task.entity';
import { Task } from '../task/entities/task.entity';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubTask]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [SubTaskController],
  providers: [SubTaskService],
})
export class SubTaskModule {}

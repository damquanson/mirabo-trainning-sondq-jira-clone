import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTaskDto } from './create-sub-task.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {}

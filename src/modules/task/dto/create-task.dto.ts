import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  projectId: number;
  @IsNotEmpty()
  reportId: number;
  @IsNotEmpty()
  assigneeId: number;
  @IsNotEmpty()
  content: string;
}

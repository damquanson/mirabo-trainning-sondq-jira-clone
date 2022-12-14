import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createSubTaskDto {
  @IsNotEmpty()
  taskId: number;
  @IsNotEmpty()
  projectId: number;
  @IsNotEmpty()
  reportId: number;
  @IsNotEmpty()
  assigneeId: number;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  status: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateSubTaskDto {
  @IsNotEmpty()
  assigneeId: number;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  status: string;
}

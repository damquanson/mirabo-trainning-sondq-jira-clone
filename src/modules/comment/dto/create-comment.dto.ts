import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  taskOrSubtaskId: number;
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  isTask: boolean;
  @IsNotEmpty()
  content: string;
}

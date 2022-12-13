import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  ownerId: number;
  @IsNotEmpty()
  description: string;
}

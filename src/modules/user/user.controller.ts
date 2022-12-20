import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/forgot/:id')
  forgotPassword(@Param('id') id: number) {
    return this.userService.createKey(id);
  }
  @Get('/reset/:token')
  resetPassword(@Param('token') token: string, @Body() body) {
    return this.userService.reset(token, body.password);
  }
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('page') page: number) {
    const query = {
      keyword: '',
      take: 5, // so luong ket qua trong 1 trang
      page: page,
    };

    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { userProject } from '../userProject/entities/userProject';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { addMemberDto } from './dto/add-member-dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<userProject[]> {
    return this.projectService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: CreateProjectDto,
  ): Promise<UpdateResult> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.projectService.remove(id);
  }
  @Post('member/add')
  async addMember(@Body() addMemberDto: addMemberDto): Promise<String> {
    return await this.projectService.addMember(addMemberDto);
  }
  @Post('member/remove')
  async removeMember(
    @Body() removeMemberDto: addMemberDto,
  ): Promise<DeleteResult> {
    return await this.projectService.removeMember(removeMemberDto);
  }
  @Get('member/accept/:id')
  async acceptInvite(@Param('id') id: number): Promise<String> {
    return await this.projectService.acceptInvite(id);
  }
  @Get('member/ignore/:id')
  async ignoreInvite(@Param('id') id: number): Promise<String> {
    return await this.projectService.ignoreInvite(id);
  }
}

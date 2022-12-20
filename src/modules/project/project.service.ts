import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteResult,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { userProject } from '../userProject/entities/userProject';
import { addMemberDto } from './dto/add-member-dto';
import { CreateProjectDto } from './dto/create-project.dto';

import { Project } from './entities/project.entity';
import { template } from './email.template';
import { Invitation } from './entities/invitation.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
    private mailServices: MailerService,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectRepo.save(createProjectDto);
  }

  async find(id: number): Promise<userProject[]> {
    const userProjectList = await this.dataSource.manager
      .createQueryBuilder(userProject, 'userproject')
      .where('userproject.userId = :id', { id: id })
      .getMany();

    let projectList = await this.dataSource.manager
      .createQueryBuilder(Project, 'project')
      .getMany();

    userProjectList.forEach((element) => {
      const project = projectList.find(
        (element1) => element.projectId == element1.id,
      );
      element['name'] = project.name;
      element['description'] = project.description;
    });
    return userProjectList;
  }

  async update(
    id: number,
    updateProjectDto: CreateProjectDto,
  ): Promise<UpdateResult> {
    return await this.projectRepo.update(id, updateProjectDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.projectRepo.delete(id);
  }
  async addMember(addMemberDto: addMemberDto): Promise<String> {
    const invitation = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Invitation)
      .values({
        userId: addMemberDto.userId,
        projectId: addMemberDto.projectId,
        role: addMemberDto.role,
      })
      .execute();
    const member = await this.userRepo.findOneBy({ id: addMemberDto.userId });

    const project = await this.projectRepo.findOneBy({
      id: addMemberDto.projectId,
    });
    const inviter = await this.userRepo.findOneBy({ id: project.ownerId });
    await this.mailServices.sendMail({
      to: member.email,
      from: 'damquanson@gmail.com',
      subject: ' You have just added a new project! Check it',
      html: template(
        project.name,
        inviter.name,
        addMemberDto.role,
        inviter.email,
      ),
    });

    return 'Success';
  }
  async removeMember(addMemberDto: addMemberDto): Promise<DeleteResult> {
    const removeMember = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(userProject)
      .where('userId = :id', { id: addMemberDto.userId })
      .andWhere('projectId=:pid', { pid: addMemberDto.projectId })
      .execute();
    return removeMember;
  }
  async acceptInvite(id: number) {
    const invitation = await this.dataSource
      .getRepository(Invitation)
      .createQueryBuilder('Invitation')
      .where('Invitation.id = :id', { id: id })
      .getOne();

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(userProject)
      .values([
        {
          projectId: invitation.projectId,
          userId: invitation.userId,
          role: invitation.role,
        },
      ])
      .execute();
    await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({ status: 'Accept' })
      .where('id = :id', { id: id })
      .execute();
    return 'Success';
  }
  async ignoreInvite(id: number) {
    const invitation = await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({ status: 'Reject' })
      .where('id = :id', { id: id })
      .execute();

    return 'Success';
  }
}

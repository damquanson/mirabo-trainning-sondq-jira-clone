import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { SubTaskModule } from './modules/sub-task/sub-task.module';
import { CommentModule } from './modules/comment/comment.module';
import { ProjectModule } from './modules/project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './modules/user/entities/user.entity';
import { Project } from './modules/project/entities/project.entity';
import { Task } from './modules/task/entities/task.entity';
import { SubTask } from './modules/sub-task/entities/sub-task.entity';
import { Comment } from './modules/comment/entities/comment.entity';
import { userProject } from './modules/userProject/entities/userProject';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
dotenv.config();
@Module({
  imports: [
    UserModule,
    TaskModule,
    SubTaskModule,
    CommentModule,
    ProjectModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Project, Task, SubTask, Comment, userProject],

      //migrationsTableName: 'migrations',
      synchronize: true,
      dropSchema: false,
    }),
    AuthModule,
    PassportModule.register({ session: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'damquanson@gmail.com',
          pass: 'ezolxttbomelnzzu',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

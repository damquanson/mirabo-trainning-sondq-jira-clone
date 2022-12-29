import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentRepo.save(createCommentDto);
  }

  async update(
    id: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<UpdateResult> {
    return await this.commentRepo.update(id, updateCommentDto);
  }
}

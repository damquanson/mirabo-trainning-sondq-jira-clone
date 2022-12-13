import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  projectId: number;
  @Column()
  reporterId: string;
  @Column()
  assigneeId: string;
  @Column({ default: 'To-do' })
  status: string;
}

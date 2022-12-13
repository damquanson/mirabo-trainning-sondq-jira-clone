import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class SubTask {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taskId: number;
  @Column()
  projectId: number;
  @Column()
  reporterId: string;
  @Column()
  assigneeId: string;
  @Column({ default: 'To-do' })
  status: string;
}

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
  reporterId: number;
  @Column()
  assigneeId: number;
  @Column()
  content: string;
  @Column({ default: 'To-do' })
  status: string;
  @Column({ default: 0 })
  logwork: number;
}

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  projectId: number;
  @Column()
  reporterId: number;
  @Column()
  assigneeId: number;
  @Column({ default: 'To-do' })
  status: string;
  @Column({ default: 0 })
  logWork: number;
}

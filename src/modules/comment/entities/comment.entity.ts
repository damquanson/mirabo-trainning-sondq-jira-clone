import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taskOrSubtaskId: string;
  @Column()
  userId: string;
  @Column()
  isTask: boolean;
  @Column({ default: 'User' })
  content: string;
}

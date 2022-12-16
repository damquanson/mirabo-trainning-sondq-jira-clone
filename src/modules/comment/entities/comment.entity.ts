import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taskOrSubtaskId: number;
  @Column()
  userId: number;
  @Column()
  isTask: boolean;
  @Column({ default: 'User' })
  content: string;
}

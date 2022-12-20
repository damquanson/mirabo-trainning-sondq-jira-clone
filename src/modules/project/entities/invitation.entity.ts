import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  projectId: number;
  @Column()
  role: string;
  @Column({ default: 'Pending' })
  status: string;
}

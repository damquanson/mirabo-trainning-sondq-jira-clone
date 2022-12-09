import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  ownerId: number;
  @Column()
  description: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Reset {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  token: string;
}

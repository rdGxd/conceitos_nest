import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  text: string;
  @Column({ nullable: false, type: 'varchar', length: 50 })
  sender: string;
  @Column({ nullable: false, type: 'varchar', length: 50 })
  to: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

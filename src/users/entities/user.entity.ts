import { IsEmail, MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @MinLength(5)
  @MaxLength(255)
  passwordHash: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

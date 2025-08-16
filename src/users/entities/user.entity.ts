import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserRole } from 'src/common/enums/UserRole';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @Column({ nullable: true, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @MinLength(5)
  @MaxLength(255)
  password: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  //  Uma Pessoa pode ter enviado muitos recados (como "sender")
  // Esses recados são relacionados ao campo "sender" na entidade Message
  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: 'sender' })
  sentMessages: Message[];

  // Uma Pessoa pode ter recebido muitos recados (como "to")
  // Esses recados são relacionados ao campo "to" na entidade Message
  @OneToMany(() => Message, (message) => message.to, { cascade: true })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: 'to' })
  receivedMessages: Message[];

  @Column({ default: true })
  isActive: boolean;
}

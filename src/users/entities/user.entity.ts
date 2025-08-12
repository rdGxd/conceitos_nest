import { Exclude, Expose } from 'class-transformer';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
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
  @Expose()
  id: string;

  @Column({ nullable: true })
  @MinLength(3)
  @MaxLength(100)
  @Expose()
  name: string;

  @Column({ nullable: true, unique: true })
  @IsEmail()
  @Expose()
  email: string;

  @Column({ nullable: true })
  @MinLength(5)
  @MaxLength(255)
  @Exclude()
  passwordHash: string;

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

  //  Uma Pessoa pode ter recebido muitos recados (como "to")
  // Esses recados são relacionados ao campo "to" na entidade Message
  @OneToMany(() => Message, (message) => message.to, { cascade: true })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: 'to' })
  receivedMessages: Message[];
}

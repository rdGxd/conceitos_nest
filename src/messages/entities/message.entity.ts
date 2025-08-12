import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  text: string;

  // Muitos recados podem ser enviados por um usuário (emissor)
  @ManyToOne(() => User, { nullable: false })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: 'sender' })
  sender: User;

  // Muitos recados podem ser enviados para um usuário (destinatário)
  @ManyToOne(() => User, { nullable: false })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: 'to' })
  to: User;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

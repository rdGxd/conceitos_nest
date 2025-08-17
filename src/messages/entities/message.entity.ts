import { Expose } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  @Expose()
  text: string;

  // Muitos recados podem ser enviados por um usuário (emissor)
  @ManyToOne(() => User, {
    nullable: false,
    onDelete: "CASCADE", // Se User for deletado, suas mensagens também são
  })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: "senderId" })
  sender: User;

  // Muitos recados podem ser enviados para um usuário (destinatário)
  @ManyToOne(() => User, {
    nullable: false,
    onDelete: "CASCADE", // Se User for deletado, mensagens para ele também são
  })
  // Especifica a coluna que será usada como chave estrangeira
  @JoinColumn({ name: "toId" })
  to: User;

  @Column({ default: false })
  @Expose()
  isRead: boolean;

  @CreateDateColumn()
  @Expose()
  createdAt?: Date;
  @Expose()
  @UpdateDateColumn()
  updatedAt?: Date;
}

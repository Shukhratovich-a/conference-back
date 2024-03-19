import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { UserEntity } from "@modules/user/user.entity";
import { TopicEntity } from "@modules/topic/topic.entity";

@Entity("articles")
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "title", type: "varchar" })
  title: string;

  @Column({ name: "sub_title", type: "varchar", nullable: true })
  subtitle?: string;

  @Column({ name: "body", type: "varchar" })
  body: string;

  @Column({ name: "file", type: "varchar", nullable: true })
  file?: string;

  @ManyToOne(() => TopicEntity, { nullable: false })
  @JoinColumn({ name: "topic_id" })
  topic: TopicEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

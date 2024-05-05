import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("admin")
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  @Column({ name: "full_name", type: "varchar" })
  fullName: string;

  @Column({ name: "username", type: "varchar", unique: true })
  username: string;

  @Column({ name: "password", type: "varchar", select: false })
  password: string;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

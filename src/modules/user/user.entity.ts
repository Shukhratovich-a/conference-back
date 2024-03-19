import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { GenderEnum } from "@enums/gender.enum";
import { RoleEnum } from "@enums/role.enum";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "first_name", type: "varchar" })
  firstName: string;

  @Column({ name: "last_name", type: "varchar" })
  lastName: string;

  @Column({ name: "gender", type: "simple-enum", enum: GenderEnum })
  gender: GenderEnum;

  @Column({ name: "role", type: "simple-enum", enum: RoleEnum, default: RoleEnum.PARTICIPANT })
  role: RoleEnum;

  @Column({ name: "institute", type: "varchar", nullable: true })
  institute: string;

  @Column({ name: "specialty", type: "varchar", nullable: true })
  specialty: string;

  @Column({ name: "description", type: "varchar", nullable: true })
  description: string;

  @Column({ name: "country", type: "varchar" })
  country: string;

  @Column({ name: "city", type: "varchar" })
  city: string;

  @Column({ name: "address", type: "varchar", nullable: true })
  address: string;

  @Column({ name: "postal_code", type: "varchar", nullable: true })
  postalCode: string;

  @Column({ name: "phone", type: "varchar" })
  phone: string;

  @Column({ name: "email", type: "varchar", unique: true })
  email: string;

  @Column({ name: "password", type: "varchar", select: false })
  password: string;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

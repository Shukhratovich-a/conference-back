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
import { CommitteeRoleEntity } from "../committee-role/committee-role.entity";

@Entity("committee")
export class CommitteeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name_en", type: "varchar" })
  nameEn: string;

  @Column({ name: "name_ru", type: "varchar" })
  nameRu: string;

  @Column({ name: "name_uz", type: "varchar" })
  nameUz: string;

  @Column({ name: "specialty_en", type: "varchar" })
  specialtyEn: string;

  @Column({ name: "specialty_ru", type: "varchar" })
  specialtyRu: string;

  @Column({ name: "specialty_uz", type: "varchar" })
  specialtyUz: string;

  @Column({ name: "country_en", type: "varchar" })
  countryEn: string;

  @Column({ name: "country_ru", type: "varchar" })
  countryRu: string;

  @Column({ name: "country_uz", type: "varchar" })
  countryUz: string;

  @Column({ name: "city_en", type: "varchar", nullable: true })
  cityEn: string;

  @Column({ name: "city_ru", type: "varchar", nullable: true })
  cityRu: string;

  @Column({ name: "city_uz", type: "varchar", nullable: true })
  cityUz: string;

  @Column({ name: "role_en", type: "varchar", nullable: true })
  roleEn: string;

  @Column({ name: "role_ru", type: "varchar", nullable: true })
  roleRu: string;

  @Column({ name: "role_uz", type: "varchar", nullable: true })
  roleUz: string;

  @ManyToOne(() => CommitteeRoleEntity, { nullable: true })
  @JoinColumn({ name: "committee_role_id" })
  committeeRole: CommitteeRoleEntity;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

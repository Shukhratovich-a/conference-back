import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("speaker")
export class SpeakerEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "degree_en", type: "varchar" })
  degreeEn: string;

  @Column({ name: "degree_ru", type: "varchar" })
  degreeRu: string;

  @Column({ name: "degree_uz", type: "varchar" })
  degreeUz: string;

  @Column({ name: "specialty_en", type: "varchar" })
  specialtyEn: string;

  @Column({ name: "specialty_ru", type: "varchar" })
  specialtyRu: string;

  @Column({ name: "specialty_uz", type: "varchar" })
  specialtyUz: string;

  @Column({ name: "description_en", type: "varchar", nullable: true })
  descriptionEn: string;

  @Column({ name: "description_ru", type: "varchar", nullable: true })
  descriptionRu: string;

  @Column({ name: "description_uz", type: "varchar", nullable: true })
  descriptionUz: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  @Column({ name: "website", type: "varchar", nullable: true })
  website: string;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

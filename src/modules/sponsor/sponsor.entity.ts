import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("sponsor")
export class SponsorEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "title_en", type: "varchar" })
  titleEn: string;

  @Column({ name: "title_ru", type: "varchar" })
  titleRu: string;

  @Column({ name: "title_uz", type: "varchar" })
  titleUz: string;

  @Column({ name: "web_site", type: "varchar" })
  website: string;

  @Column({ name: "image", type: "varchar" })
  image: string;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

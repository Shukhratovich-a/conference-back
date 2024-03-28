import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, Check, PrimaryColumn } from "typeorm";

@Entity("homepage")
@Check(`id = 1`)
export class HomepageEntity extends BaseEntity {
  @PrimaryColumn({ name: "id", type: "int", default: 1, nullable: false })
  id: 1;

  @Column({ name: "main_text_en", type: "varchar", default: "" })
  mainTextEn: string;

  @Column({ name: "main_text_ru", type: "varchar", default: "" })
  mainTextRu: string;

  @Column({ name: "main_text_uz", type: "varchar", default: "" })
  mainTextUz: string;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

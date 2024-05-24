import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Check } from "typeorm";

@Entity("fee")
@Check(`id = 1`)
export class FeeEntity extends BaseEntity {
  @PrimaryColumn({ name: "id", type: "int", default: 1, nullable: false })
  id: 1;

  @Column({ name: "body_en", type: "varchar", default: "" })
  bodyEn: string;

  @Column({ name: "body_ru", type: "varchar", default: "" })
  bodyRu: string;

  @Column({ name: "body_uz", type: "varchar", default: "" })
  bodyUz: string;

  @CreateDateColumn({ name: "create_at", type: "datetime" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "datetime" })
  updateAt: Date;
}

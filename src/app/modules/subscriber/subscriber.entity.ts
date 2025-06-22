import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "subscribers" })
export class Subscriber {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ type: "varchar", unique: true })
  email!: string;
  @Column({ type: "varchar" })
  name!: string;
  @Column({ type: "boolean", default: false })
  isSubscribed!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BodySystem } from "./BodySystem";

@Entity()
export class DoctorSpecialization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nameKey: string;

  @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.doctorsSpecializations, { nullable: false })
  @JoinColumn({ name: 'bodySystemId' })
  bodySystem: BodySystem;
}
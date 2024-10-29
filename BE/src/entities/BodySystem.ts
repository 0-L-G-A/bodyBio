import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DoctorSpecialization } from "./DoctorSpecialization";
import { Lab } from "./Lab";
import { Finding } from "./Finding";
import { Diagnoze } from "./Diagnoze";

@Entity()
export class BodySystem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nameKey: string;

  @Column({ type: 'int', default: 0 })
  level: number;

  @OneToMany(() => DoctorSpecialization, (specialization) => specialization.bodySystem)
  doctorsSpecializations: DoctorSpecialization[];

  @OneToMany(() => Lab, (lab) => lab.bodySystem)
  @JoinColumn({ name: 'id' })
  laboratories: Lab[];

  @OneToMany(() => Finding, (finding) => finding.bodySystem)
  @JoinColumn({ name: 'id' })
  findings: Finding[];

  @OneToMany(() => Diagnoze, (diagnoze) => diagnoze.bodySystem)
  @JoinColumn({ name: 'id' })
  diagnozes: Diagnoze[];
}
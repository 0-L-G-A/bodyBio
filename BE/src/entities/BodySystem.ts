import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DoctorSpecialization } from "./DoctorSpecialization";
import { Laboratory } from "./Laboratory";
import { Finding } from "./Finding";
import { Diagnoze } from "./Diagnoze";

@Entity()
export class BodySystem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  level: number;

  @OneToMany(() => DoctorSpecialization, (specialization) => specialization.bodySystem)
  doctorsSpecializations: DoctorSpecialization[];

  @OneToMany(() => Laboratory, (laboratory) => laboratory.bodySystem)
  @JoinColumn({ name: 'id' }) // Ясно вказуємо на колонку зовнішнього ключа
  laboratories: Laboratory[];

  @OneToMany(() => Finding, (finding) => finding.bodySystem)
  @JoinColumn({ name: 'id' }) // Ясно вказуємо на колонку зовнішнього ключа
  findings: Finding[];

  @OneToMany(() => Diagnoze, (diagnoze) => diagnoze.bodySystem)
  @JoinColumn({ name: 'id' }) // Ясно вказуємо на колонку зовнішнього ключа
  diagnozes: Diagnoze[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Finding {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Назва лабораторії

    @Column()
    level: number; // Рівень ієрархії (для дітей)

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.laboratories, { nullable: false })
    @JoinColumn({ name: 'id' }) // Ясно вказуємо на колонку зовнішнього ключа
    bodySystem: BodySystem; // Зовнішній ключ для зв'язку з BodySystem

    @OneToMany(() => Finding, (finding) => finding.parent, { cascade: true })
    children: Finding[]; // Дочірні лабораторії

    @ManyToOne(() => Finding, (finding) => finding.children)
    parent: Finding; // Батьківська лабораторія
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Lab {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Назва лабораторії

    @Column()
    nameKey: string; // Ключ для назви лабораторії (може бути використаний для i18n)

    @Column({ type: 'int', default: 1 })
    level: number; // Рівень ієрархії (для дітей)

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.laboratories, { nullable: false })
    @JoinColumn({ name: 'bodySystemId' }) // Зовнішній ключ для зв'язку з BodySystem
    bodySystem: BodySystem;

    @OneToMany(() => Lab, (lab) => lab.parent, { cascade: true })
    children: Lab[];

    @ManyToOne(() => Lab, (lab) => lab.children, { nullable: true })
    @JoinColumn({ name: 'parentId' }) // Вказуємо колонку зовнішнього ключа для батьківської лабораторії
    parent: Lab;
}
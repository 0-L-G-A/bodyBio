import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Diagnoze {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Назва лабораторії

    @Column()
    level: number; // Рівень ієрархії (для дітей)

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.laboratories, { nullable: false })
    @JoinColumn({ name: 'id' }) // Ясно вказуємо на колонку зовнішнього ключа
    bodySystem: BodySystem; // Зовнішній ключ для зв'язку з BodySystem

    @OneToMany(() => Diagnoze, (diagnoze) => diagnoze.parent, { cascade: true })
    children: Diagnoze[]; // Дочірні лабораторії

    @ManyToOne(() => Diagnoze, (diagnoze) => diagnoze.children)
    parent: Diagnoze; // Батьківська лабораторія
}
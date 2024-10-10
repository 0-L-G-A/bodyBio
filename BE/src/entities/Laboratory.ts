import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Laboratory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // Назва лабораторії

    @Column()
    level: number; // Рівень ієрархії (для дітей)

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.laboratories, { nullable: false })
    @JoinColumn({ name: 'id' }) // Ясно вказуємо на колонку зовнішнього ключа
    bodySystem: BodySystem; // Зовнішній ключ для зв'язку з BodySystem

    @OneToMany(() => Laboratory, (laboratory) => laboratory.parent, { cascade: true })
    children: Laboratory[]; // Дочірні лабораторії

    @ManyToOne(() => Laboratory, (laboratory) => laboratory.children)
    parent: Laboratory; // Батьківська лабораторія
}
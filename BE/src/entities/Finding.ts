import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Finding {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    nameKey: string;

    @Column({ type: 'int', default: 1 })
    level: number;

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.diagnozes, { nullable: false })
    @JoinColumn({ name: 'bodySystemId' }) // Зовнішній ключ для зв'язку з BodySystem
    bodySystem: BodySystem;

    @OneToMany(() => Finding, (finding) => finding.parent, { cascade: true })
    children: Finding[];

    @ManyToOne(() => Finding, (finding) => finding.children, { nullable: true })
    @JoinColumn({ name: 'parentId' }) // Вказуємо колонку зовнішнього ключа для батьківської лабораторії
    parent: Finding;

}
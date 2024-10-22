import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Diagnoze {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    nameKey: string;

    @Column({ type: 'int', default: 1 })
    level: number;

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.diagnozes, { nullable: false })
    @JoinColumn({ name: 'bodySystemId' })
    bodySystem: BodySystem;

    @OneToMany(() => Diagnoze, (diagnoze) => diagnoze.parent, { cascade: true })
    children: Diagnoze[];

    @ManyToOne(() => Diagnoze, (diagnoze) => diagnoze.children, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent: Diagnoze;
}
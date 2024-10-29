import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BodySystem } from './BodySystem';

@Entity()
export class Lab {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    nameKey: string;

    @Column({ type: 'int', default: 1 })
    level: number;

    @ManyToOne(() => BodySystem, (bodySystem) => bodySystem.laboratories, { nullable: false })
    @JoinColumn({ name: 'bodySystemId' })
    bodySystem: BodySystem;

    @OneToMany(() => Lab, (lab) => lab.parent, { cascade: true })
    children: Lab[];

    @ManyToOne(() => Lab, (lab) => lab.children, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent: Lab;
}
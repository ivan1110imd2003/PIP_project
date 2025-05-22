import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trip } from './Trip'; // Импортираме Trip, защото User има връзка към Trip

@Entity('users')
export class User { // Ключовата дума "export" прави класа достъпен за импортиране
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    // ... останалата част от класа User
    @OneToMany(() => Trip, trip => trip.organizer)
    organizedTrips!: Trip[];

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 255 })
    destination!: string;

    @Column({ type: 'date' })
    startDate!: Date;

    @Column({ type: 'date' })
    endDate!: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    budget?: number;

    // @ManyToOne(() => User, user => user.organizedTrips, { onDelete: 'SET NULL', nullable: true })
    // @JoinColumn({ name: 'organizerId' }) 
    // organizer?: User | null;

    @Column({ type: 'uuid', nullable: true })
    organizerId?: string | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Може да добавиш и други полета: status (planning, active, completed), coverImage, etc.
}
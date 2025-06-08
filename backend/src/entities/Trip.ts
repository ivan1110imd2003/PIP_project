import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'; // Импортираме User, защото Trip има връзка към User

@Entity('trips')
export class Trip { // Ключовата дума "export" прави класа достъпен за импортиране от други файлове
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @ManyToOne(() => User, user => user.organizedTrips, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'organizerId' })
    organizer?: User | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    username?: string;

    @Column({ type: 'uuid', nullable: true }) // Типът трябва да съответства на PrimaryKey на User (uuid в нашия случай)
    organizerId?: string | null;

    @Column({ type: 'varchar', length: 255 })
    passwordHash!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    firstName?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lastName?: string;

    // @OneToMany(() => Trip, trip => trip.organizer)
    // organizedTrips!: Trip[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
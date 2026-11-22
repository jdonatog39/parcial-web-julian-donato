import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    role_name: string;

    @Column({ type: 'text' , nullable: true })
    description: string | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;



}

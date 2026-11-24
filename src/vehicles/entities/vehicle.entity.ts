import { Column, Entity, JoinTable,JoinColumn   , ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity.js';
import { VehicleStatus, VehicleType } from './vehicle.enums.js';
import {User} from '../../users/entities/user.entity.js';
@Entity("vehicles")
export class Vehicle {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "varchar", length:6, unique:true,nullable: false})
    plate: string;
    @Column({type: "varchar", length:100, nullable: false})
    type: VehicleType;
    @Column({type:"varchar", length:50,nullable:true})
    color: string | null;
    @Column({type:"varchar", length:50,default:VehicleStatus.FUERA})
    status: VehicleStatus;
    
    @Column({ type: 'timestamp', nullable: true})
    entered_at: Date|null;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'uuid' })
    owner_id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' })
    owner: User;


}

import { Column, Entity, JoinTable,JoinColumn   , ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity.js';
import {User} from '../../users/entities/user.entity.js';
export enum parkingStatus {
 pending = 'Pending',
 completed = 'Completed',
 canceled = 'Canceled',
}


export enum parkingCharge {
 LOW = 'standard',
 MEDIUM = 'fast',
 HIGH = 'ultra_fast',
}

@Entity("parkingspots")
export class ParkingSpot {
   
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column({type: "varchar", length:10, unique:true,nullable: false})
   code: string;
   @Column({type: "varchar", length:100, nullable: false})
   chargeType: parkingCharge;

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;
   

   @Column({ type: 'uuid' })
   id_supervisor: string;


   @ManyToOne(() => User, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'id_supervisor' })
   supervisor: User;




}

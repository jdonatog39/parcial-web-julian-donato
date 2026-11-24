import { Column, Entity, JoinTable,JoinColumn   , ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity.js';
import {User} from '../../users/entities/user.entity.js';
import { ParkingSpot } from '../../parkingspots/entities/parkingspot.entity.js';
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

@Entity("reservations")
export class Reservation {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column({ type: 'timestamp', nullable: false})
   date: Date;
   @Column({type: "varchar", length:6, unique:true,nullable: false})
   vehicle_plate: string;
   @Column({type: "varchar", length:100, nullable: false})
   vehicle_max_charge: parkingCharge;
   @Column({type:"varchar", length:50,default:parkingStatus.pending})
   status: parkingStatus;
  
   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;


   @Column({ type: 'uuid' })
   parking_spot_id: string;


   @ManyToOne(() => ParkingSpot, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'parking_spot_id' })
   parkingSpot: ParkingSpot;

   @Column({ type: 'uuid' })
   user_id: string;


   @ManyToOne(() => User, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'user_id' })
   user: User;



}
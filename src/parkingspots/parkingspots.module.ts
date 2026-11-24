import { Module } from '@nestjs/common';
import { ParkingspotsService } from './parkingspots.service.js';
import { ParkingspotsController } from './parkingspots.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parkingPolicy } from './parkingspot.policy.js';
import { ParkingSpot } from './entities/parkingspot.entity.js';
@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot])],
  controllers: [ParkingspotsController],
  providers: [ParkingspotsService,parkingPolicy],
})
export class ParkingspotsModule {}

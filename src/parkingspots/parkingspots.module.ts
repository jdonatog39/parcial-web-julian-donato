import { Module } from '@nestjs/common';
import { ParkingspotsService } from './parkingspots.service.js';
import { ParkingspotsController } from './parkingspots.controller.js';

@Module({
  controllers: [ParkingspotsController],
  providers: [ParkingspotsService],
})
export class ParkingspotsModule {}

import { Injectable } from '@nestjs/common';
import { CreateParkingspotDto } from './dto/create-parkingspot.dto.js';
import { UpdateParkingspotDto } from './dto/update-parkingspot.dto.js';

@Injectable()
export class ParkingspotsService {
  create(createParkingspotDto: CreateParkingspotDto) {
    return 'This action adds a new parkingspot';
  }

  findAll() {
    return `This action returns all parkingspots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingspot`;
  }

  update(id: number, updateParkingspotDto: UpdateParkingspotDto) {
    return `This action updates a #${id} parkingspot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingspot`;
  }
}

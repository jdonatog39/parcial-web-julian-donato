import { Injectable } from '@nestjs/common';
import { CreateParkingspotDto } from './dto/create-parkingspot.dto.js';
import { UpdateParkingspotDto } from './dto/update-parkingspot.dto.js';
import { CreateReservationDto } from '../reservations/dto/create-reservation.dto.js';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity.js';
import {parkingStatus, parkingCharge, ParkingSpot} from '../parkingspots/entities/parkingspot.entity.js';
import { Repository } from 'typeorm';  
import { User } from '../users/entities/user.entity.js';
import { AssignRolesDto } from '../roles/dto/create-role.dto.js';
import { RolesService } from '../roles/roles.service.js';
import { UsersService } from '../users/users.service.js';
import { Reservation } from '../reservations/entities/reservation.entity.js';
@Injectable()
export class ParkingspotsService {
  constructor(
      @InjectRepository(ParkingSpot)
      private readonly parkingSpotRepository: Repository<ParkingSpot>,
      private readonly rolesService: RolesService,
      private readonly userRepository: UsersService,
      private readonly reservationsRepository: Repository<Reservation>,
    ) {}

  async create(CreateParkingspotDto: CreateParkingspotDto) {
    const user = await this.userRepository.findOne({ where: { id: CreateParkingspotDto.id_supervisor }, relations: ['roles'] });
    if (!user || !user.roles.some(role => role.role_name === 'supervisor')) {
      throw new BadRequestException('El supervisor asignado debe tener el rol de supervisor');
    }
    if (await this.parkingSpotRepository.findOne({ where: { code: CreateParkingspotDto.code } })) {
      throw new ConflictException('Código de puesto de estacionamiento ya registrado');
    }
    const parkingSpot = this.parkingSpotRepository.create(CreateParkingspotDto);
    const saved = await this.parkingSpotRepository.save(parkingSpot);
    return { message: 'puesto de estacionamiento registrado con éxito', parkingSpotId: saved.id };

  }


}

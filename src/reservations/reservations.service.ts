import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity.js';
import {parkingStatus, parkingCharge, ParkingSpot} from '../parkingspots/entities/parkingspot.entity.js';
import { In, Repository } from 'typeorm';  
import { User } from '../users/entities/user.entity.js';
import { AssignRolesDto } from '../roles/dto/create-role.dto.js';
import { RolesService } from '../roles/roles.service.js';
import { UsersService } from '../users/users.service.js';
import { Reservation } from './entities/reservation.entity.js';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    private readonly rolesService: RolesService,
    private readonly userRepository: UsersService,
    private readonly parkingSpotRepository: Repository<ParkingSpot>,
  ) {}

  async create(CreateReservationDto: CreateReservationDto) {
    const user = await this.userRepository.findOne({ where: { id: CreateReservationDto.user_id },relations: { owner: true } });
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const parkingSpot = await this.parkingSpotRepository.findOne({ where: { id: CreateReservationDto.parking_spot_id } });
    if (!parkingSpot) {
      throw new BadRequestException('Puesto de estacionamiento no encontrado');
    }
    //un vehiculo no puede reservar un puesto con mas potencia que la que soporta 
    if (CreateReservationDto.vehicle_max_charge === parkingCharge.HIGH && parkingSpot.chargeType !== parkingCharge.HIGH) {
      throw new BadRequestException('El tipo de carga del vehículo excede la capacidad del puesto de estacionamiento');
    }
    if (CreateReservationDto.vehicle_max_charge === parkingCharge.MEDIUM && parkingSpot.chargeType === parkingCharge.LOW) {
      throw new BadRequestException('El tipo de carga del vehículo excede la capacidad del puesto de estacionamiento');
    }
    const reservation = this.reservationsRepository.create(CreateReservationDto);
    const saved = await this.reservationsRepository.save(reservation);
    return { message: 'Reserva creada con éxito', reservationId: saved.id };
  }
  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }
  async findAll(user: User) {
    if (user.roles.some(role => role.role_name === 'admin')) {
      return await this.reservationsRepository.find({ relations: ['user', 'parkingSpot'] });
    }
    if (user.roles.some(role => role.role_name === 'supervisor')) {
      const parkingSpots = await this.parkingSpotRepository.find({ where: { supervisor: { id: user.id } } });
      const parkingSpotIds = parkingSpots.map(spot => spot.id);
      return await this.reservationsRepository.find({ where: { parking_spot_id: In(parkingSpotIds) }, relations: ['user', 'parkingSpot'] });
    }
    return await this.reservationsRepository.find({ where: { user: { id: user.id } }, relations: ['user', 'parkingSpot'] });
  }
  async updateStatus(id: number, status: 'completed' | 'cancelled', user: User) {
    if (!user.roles.some(role => role.role_name === 'supervisor')) {
      throw new BadRequestException('Solo el supervisor puede actualizar el estado de la reserva');
    }
    const reservation = await this.reservationsRepository.findOne({ where: { id }, relations: ['parkingSpot'] });
    if (!reservation) {
      throw new BadRequestException('Reserva no encontrada');
    }
    if (reservation.parkingSpot.supervisor.id !== user.id) {
      throw new BadRequestException('No tiene permiso para actualizar esta reserva');
    }
    if (reservation.status !== 'pending') {
      throw new BadRequestException('Solo se puede actualizar el estado de reservas pendientes');
    }
    reservation.status = status;
    await this.reservationsRepository.save(reservation);
    return { message: 'Estado de la reserva actualizado con éxito' };
  }
  async delete(id: number, user: User) {
    const reservation = await this.reservationsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!reservation) {
      throw new BadRequestException('Reserva no encontrada');
    }
    if (reservation.user.id !== user.id) {
      throw new BadRequestException('No tiene permiso para eliminar esta reserva');
    }
    if (reservation.status !== 'pending') {
      throw new BadRequestException('Solo se pueden eliminar reservas pendientes');
    }
    await this.reservationsRepository.remove(reservation);
    return { message: 'Reserva eliminada con éxito' };
  }

}


import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity.js';
import {parkingStatus, parkingCharge, ParkingSpot} from '../parkingspots/entities/parkingspot.entity.js';
import { Repository } from 'typeorm';  
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
  //crear una reserva, un coductor reserva un puesto para una fecha,indicando la placa y el tipo de carga mas potente que soporta el vehiculo
  async create(CreateReservationDto: CreateReservationDto) {
    const user = await this.userRepository.findOne({ where: { id: CreateReservationDto.user_id }, relations: 'roles' });
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

}


@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
    private readonly rolesService: RolesService,
    private readonly userRepository: UsersService,
  ) {}

  async create(CreateVehicleDto: CreateVehicleDto) {
    if (await this.vehiclesRepository.existsBy({plate : CreateVehicleDto.plate })) {
      throw new ConflictException('placa ya registrada');
    }
    const vehicle = this.vehiclesRepository.create(CreateVehicleDto);
    const saved = await this.vehiclesRepository.save(vehicle);
    return { message: 'vehiculo registrado con éxito', vehicleId: saved.id };

  }

  async findAll() {
    return await this.vehiclesRepository.find({select: { id: true, plate: true, type: true,color:true,status:true ,owner_id: true },relations: { owner: true }});
  }

  async findOne(id: string) {
    const user = await this.vehiclesRepository.findOne({where: { id },select: { id: true, plate: true, type: true,color:true,status:true ,owner_id: true },relations: { owner: true },});
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }
    return user;
  }
  findById(id: string) {
    return this.vehiclesRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
  }

  findByPlateWithPassword(plate: string) {
    return this.vehiclesRepository.findOne({
      where: { plate },
      select: {  id: true, plate: true, type: true,color:true,status:true },
    });
  }
  async registerVehicle(id: string){
    const vehicle = await this.findOne(id);
    if (vehicle.status === VehicleStatus.DENTRO) {             // 2. regla de ESTADO
    throw new BadRequestException('El vehículo ya está dentro'); // 3. throw (400)
    }

    vehicle.status = VehicleStatus.DENTRO;                     // 4. operar
    vehicle.entered_at = new Date();
    await this.vehiclesRepository.save(vehicle);
    return { message: 'Entrada registrada', entered_at: vehicle.entered_at };
  }

  async ExitVehicle(id: string){
    const vehicle = await this.findOne(id);
    if (vehicle.status === VehicleStatus.FUERA) {             // 2. regla de ESTADO
    throw new BadRequestException('El vehículo ya está fuera'); // 3. throw (400)
    }

    vehicle.status = VehicleStatus.FUERA;                     // 4. operar
    vehicle.entered_at = new Date();
    await this.vehiclesRepository.save(vehicle);
    return { message: 'Salida registrada' };
  }
  async remove(id: string) {
    const vehicle = await this.findOne(id);
    return this.vehiclesRepository.remove(vehicle);
  }

}


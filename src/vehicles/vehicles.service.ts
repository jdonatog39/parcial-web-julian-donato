import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { UpdateVehicleDto } from './dto/update-vehicle.dto.js';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity.js';
import { Repository } from 'typeorm';  
import { User } from '../users/entities/user.entity.js';
import { AssignRolesDto } from '../roles/dto/create-role.dto.js';
import { RolesService } from '../roles/roles.service.js';
import { Vehicle } from './entities/vehicle.entity.js';
import { UsersService } from '../users/users.service.js';
import { VehicleStatus } from './entities/vehicle.enums.js';

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


import { isBoolean,Length, IsNotEmpty, IsString, IsBoolean, isNotEmpty, IsOptional, isString, IsEnum, IsUUID} from 'class-validator';
import { VehicleStatus, VehicleType } from '../entities/vehicle.enums.js';
export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 6, { message: 'Placa inválida' })
    plate: string;
    @IsNotEmpty()
    @IsEnum(VehicleType)
    type: VehicleType;
    @IsOptional()
    @IsString()
    color?: string;
    @IsUUID()
    owner_id: string;
}

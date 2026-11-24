import { isBoolean, IsNotEmpty, IsString, IsBoolean, isNotEmpty, IsOptional, IsUUID} from 'class-validator';
export class CreateReservationDto {
    @IsNotEmpty()
    @IsString()
    date: Date;
    
    @IsNotEmpty()
    @IsString()
    vehicle_plate: string;

    @IsNotEmpty()
    @IsString()
    vehicle_max_charge: string;

    @IsNotEmpty()
    @IsUUID()
    parking_spot_id: string;

    @IsNotEmpty()
    @IsUUID()
    user_id: string;
}

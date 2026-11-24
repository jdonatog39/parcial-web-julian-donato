import { isBoolean, IsNotEmpty, IsString, IsBoolean, isNotEmpty, IsOptional, IsUUID} from 'class-validator';

export class CreateParkingspotDto {
    @IsNotEmpty()
    @IsString()
    code: string;
    
    @IsNotEmpty()
    @IsString()
    chargeType: string;

    @IsNotEmpty()
    @IsUUID()
    id_supervisor: string;
}


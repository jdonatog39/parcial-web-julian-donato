import { isBoolean, IsNotEmpty, IsString, IsBoolean, isNotEmpty, IsOptional} from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    phone: string;
}

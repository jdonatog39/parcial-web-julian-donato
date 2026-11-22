import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshDto {
  @IsString({ message: 'refreshToken es requerido' })
  @IsNotEmpty({ message: 'refreshToken es requerido' })
  refreshToken: string;
}
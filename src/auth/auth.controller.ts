import {Body,Controller,HttpCode,HttpException,HttpStatus,Post,UnauthorizedException,} from '@nestjs/common';
import { PasswordHasher, Public, TokenService } from '@nestjs/authentication';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto, RefreshDto } from './auth.dto.js';

@Public() 
@Controller('auth')
export class AuthController {
  constructor(
    private readonly users: UsersService,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const password = await this.hasher.hash(dto.password); 
    return this.users.create({ ...dto, password });       
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.users.findByEmailWithPassword(dto.email);
    const valid = await this.hasher.verify(dto.password, user?.password);
    if (!user || !valid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    if (!user.is_active) {
      throw new HttpException('Usuario desactivado', HttpStatus.LOCKED);
    }
    return this.tokens.issue(user.id, { method: 'password' });
  }
  @HttpCode(200)
  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.tokens.refresh(dto.refreshToken);
  }
  @HttpCode(204)
  @Post('logout')
  async logout(@Body() dto: RefreshDto) {
    await this.tokens.revoke(dto.refreshToken);
  }
}
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { JwtAuth } from './jwt.auth.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule],      
  controllers: [AuthController],
  providers: [JwtAuth],
})
export class AuthModule {}

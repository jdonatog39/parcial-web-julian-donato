import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { User } from './entities/user.entity.js';
import { RolesModule } from '../roles/roles.module.js';
import { UserPolicy } from './user.policy.js';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UserPolicy],
  exports: [UsersService],   // 👈 para que AuthModule lo use
})
export class UsersModule {}
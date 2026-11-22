import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AssignRolesDto } from '../roles/dto/create-role.dto.js';
import { UserPolicy } from './user.policy.js';
import { Can } from '@nestjs/authorization';
import { User } from './entities/user.entity.js';
import { CurrentUser } from '@nestjs/authentication';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Can(UserPolicy, 'list')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Can.Anyone()                
  @Get('me')
  me(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id); 
  }
  
  @Can(UserPolicy, 'read')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Can(UserPolicy, 'update')
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Can(UserPolicy, 'assignRoles')
  @Patch(':id/roles')
  asignarRol(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AssignRolesDto) {
    return this.usersService.asignarRol(id, dto.roles);
  }
  @Can(UserPolicy, 'delete')
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.usersService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { RolesService } from './roles.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { parse } from 'next/dist/build/swc/index.js';
import { RolePolicy } from './role.policy.js';
import { Can } from '@nestjs/authorization';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Can(RolePolicy, 'create')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
  @Can(RolePolicy, 'list')  
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Can(RolePolicy, 'read')
  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.rolesService.findOne(id);
  }

  @Can(RolePolicy, 'update')
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Can(RolePolicy, 'delete')
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.rolesService.remove(id);
  }
}

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { Role } from './entities/role.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
    ) {}

  async create(dto: CreateRoleDto) {
    if (await this.repo.existsBy({ role_name: dto.role_name })) {
      throw new ConflictException('role_name ya existe');
    }
    const role = this.repo.create(dto);
    const saved = await this.repo.save(role);
    return { message: 'Rol creado con éxito', roleId: saved.id };
  }

  async findAll() {
    try {
      return await this.repo.find({
        select: { id: true, role_name: true, description: true },
        order: { role_name: 'ASC' },
      });
    } catch {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }
  findByNames(names: string[]) {
    return this.repo.find({ where: { role_name: In(names) } });
  }
  
  async findOne(id: string) {
    const role = await this.repo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    return this.repo.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    return this.repo.remove(role);
  }
}

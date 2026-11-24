import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity.js';
import { Repository } from 'typeorm';  
import { User } from './entities/user.entity.js';
import { AssignRolesDto } from '../roles/dto/create-role.dto.js';
import { RolesService } from '../roles/roles.service.js';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.existsBy({ email: createUserDto.email })) {
      throw new ConflictException('Email ya registrado');
    }
    const user = this.userRepository.create(createUserDto);
    const saved = await this.userRepository.save(user);
    return { message: 'Usuario registrado con éxito', userId: saved.id };

  }
  
  async findAll() {
    return await this.userRepository.find({select: { id: true, email: true, name: true },relations: { roles: true },order: { name: 'ASC' }});
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({where: { id },select: { id: true, email: true, name: true, phone: true },relations: { roles: true },});
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }
    return user;
  }
  findById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true, is_active: true },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async asignarRol(id: string, roleNames: string[]) {
    const user = await this.findOne(id);
    const roles = await this.rolesService.findByNames(roleNames);
    if (roles.length !== roleNames.length) {
      throw new BadRequestException('roles inválidos');
    }
    user.roles = roles;
    await this.userRepository.save(user);
    return { message: 'Roles asignados' };
  }
}

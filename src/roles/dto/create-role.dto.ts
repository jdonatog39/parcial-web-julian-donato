import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateRoleDto {
    @IsNotEmpty({ message: 'role_name es requerido' })
    @IsString()
    role_name: string;
    
    @IsString()
    @IsOptional()
    description: string;

}
export class AssignRolesDto {
  @IsArray({ message: 'roles inválidos' })
  @ArrayNotEmpty({ message: 'roles inválidos' })
  @IsString({ each: true, message: 'roles inválidos' })
  roles: string[];
}
 

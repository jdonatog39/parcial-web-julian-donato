import { Policy, type PolicyBefore } from '@nestjs/authorization';
import { User } from './entities/user.entity.js';
import { Role } from '../roles/entities/role.entity.js';
@Policy()
export class UserPolicy implements PolicyBefore<User> {

  private hasRole(user: User | null, roles: string[]): boolean {
    if (!user?.roles) return false;
    return user.roles.some((r) => roles.includes(r.role_name));
  }

  before(user: User | null) {
    if (user?.roles?.some((r) => r.role_name === 'admin')) return true; 
  }

  list(_user: User | null) {
    return false;   // GET /users → solo admin (lo deja pasar before)
  }

  assignRoles(_user: User | null) {
    return false;   // PATCH /users/:id/roles → solo admin
  }
  list2(user:User | null){
    return this.hasRole(user,["operador"]);
  }
  //list ()

  read(_user: User | null) { return false; }

  update(_user: User | null) { return false; }

  delete(_user: User | null) { return false; }
}
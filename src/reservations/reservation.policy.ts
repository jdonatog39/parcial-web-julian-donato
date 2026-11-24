import { Policy, type PolicyBefore } from '@nestjs/authorization';
import { User } from '../users/entities/user.entity.js';
import { Role } from '../roles/entities/role.entity.js';
@Policy()
export class reservationPolicy implements PolicyBefore<User> {

  private hasRole(user: User | null, roles: string[]): boolean {
    if (!user?.roles) return false;
    return user.roles.some((r) => roles.includes(r.role_name));
  }
  before(user: User | null) {
    if (user?.roles?.some((r) => r.role_name === 'admin')) return true; 
  }


  list(_user: User | null) {
    return false;   
  }

  assignRoles(_user: User | null) {
    return false;  
  }
  list2(user:User | null){
    return this.hasRole(user,["operador"]);
  }
  //list ()

  read(_user: User | null) { return false; }

  update(_user: User | null) { return false; }

  delete(_user: User | null) { return false; }
}
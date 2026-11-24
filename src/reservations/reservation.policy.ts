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
    
  }
  crearReserva(user: User | null) {
    return this.hasRole(user, ["supervisor","admin","conductor"]);
  }

  verReserva(user: User | null) {
    return this.hasRole(user,["supervisor","admin","conductor"]);
  }
  actualizarReserva(user: User | null) {
    return this.hasRole(user,["supervisor"]);
  }

  delete(_user: User | null) { 
    return this.hasRole(_user, ["conductor"]);
   }
}
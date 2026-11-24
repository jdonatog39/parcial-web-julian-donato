import { Policy, type PolicyBefore } from '@nestjs/authorization';
import { User } from '../users/entities/user.entity.js';

@Policy()
export class VehiclePolicy implements PolicyBefore<User> {
  before(user: User | null) {
    if (user?.roles?.some((r) => r.role_name === 'admin')) return true;
  }

  create(_user: User | null) {
    return false;   // POST /roles → solo admin
  }

  list(_user: User | null) {
    return false;   // GET /roles → solo admin
  }
  read(_user: User | null) { return false; }     // GET /roles/:id → solo admin

  update(_user: User | null) { return false; }   // PATCH /roles/:id → solo admin
  
  delete(_user: User | null) { return false; }   // DELETE /roles/:id → solo admin
}
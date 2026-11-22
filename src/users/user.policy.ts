import { Policy, type PolicyBefore } from '@nestjs/authorization';
import { User } from './entities/user.entity.js';

@Policy()
export class UserPolicy implements PolicyBefore<User> {
  before(user: User | null) {
    if (user?.roles?.some((r) => r.role_name === 'admin')) return true; 
  }

  list(_user: User | null) {
    return false;   // GET /users → solo admin (lo deja pasar before)
  }

  assignRoles(_user: User | null) {
    return false;   // PATCH /users/:id/roles → solo admin
  }

  read(_user: User | null) { return false; }

  update(_user: User | null) { return false; }

  delete(_user: User | null) { return false; }
}
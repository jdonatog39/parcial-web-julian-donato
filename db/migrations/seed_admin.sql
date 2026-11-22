-- Roles iniciales
INSERT INTO roles (role_name, description) VALUES
  ('admin', 'Administrador del sistema'),
  ('supervisor', 'Supervisor'),
  ('user', 'Usuario estándar')
ON CONFLICT (role_name) DO NOTHING;

-- Usuario admin (password: Admin123456789)
INSERT INTO users (email, password, name) VALUES
  ('admin@parcial.com', '$scrypt$ln=17,r=8,p=1$wrAXqytFLJGuk/N4YfgMLw$p02BbsrN2yaJmS6Sq5X3po+e2RJVy/+NNqjtFoO6860', 'Administrador')
ON CONFLICT (email) DO NOTHING;

-- Asignar el rol admin al usuario admin
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@parcial.com' AND r.role_name = 'admin'
ON CONFLICT DO NOTHING;
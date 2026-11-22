# Preparcial · Sistema de usuarios y roles con NestJS

API en NestJS con autenticación JWT (access + refresh token) usando `@nestjs/authentication`,
autorización por roles con policies de `@nestjs/authorization` y persistencia en PostgreSQL con TypeORM.

## Requisitos

- Node.js 20+
- Docker Desktop

## Cómo correr el proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno
Copiar el archivo de ejemplo y generar un `JWT_SECRET`:
```bash
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Pegar el resultado en `JWT_SECRET` dentro del `.env`.

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5433` |
| `DB_USER` | Usuario de la base | `parcial_user` |
| `DB_PASS` | Contraseña de la base | `parcial123` |
| `DB_NAME` | Nombre de la base | `parcial_db` |
| `JWT_SECRET` | Clave para firmar los tokens (mínimo 32 caracteres aleatorios) | — |
| `JWT_EXPIRES_IN` | Duración del access token | `2m` |
| `JWT_REFRESH_EXPIRES_IN` | Duración del refresh token | `7d` |

### 3. Levantar PostgreSQL
```bash
docker compose up -d
```

### 4. Ejecutar las migraciones
```bash
docker exec -i parcial_db psql -U parcial_user -d parcial_db < db/migrations/001_create_tables.sql
docker exec -i parcial_db psql -U parcial_user -d parcial_db < db/migrations/002_seed_admin.sql
```
- `001_create_tables.sql`: crea las tablas `users`, `roles` y `user_roles` (muchos a muchos).
- `002_seed_admin.sql`: crea los roles iniciales, el usuario admin y le asigna el rol admin.

(Opcional) Cargar los usuarios y roles de prueba:
```bash
docker exec -i parcial_db psql -U parcial_user -d parcial_db < db/scripts/usuarios_roles_probados.sql
```

### 5. Iniciar la API
```bash
npm run start:dev
```
La API queda en `http://localhost:3000`.

## Usuarios de prueba

| Email | Password | Roles |
|---|---|---|
| `admin@parcial.com` | `Admin123456789` | admin |
| `julian@test.com` | `123456789012` | operador |
| `ana@test.com` | `123456789012` | — |

## Endpoints

| Método | URI | Acceso | Descripción |
|---|---|---|---|
| POST | `/auth/register` | Público | Registra un usuario (sin roles) |
| POST | `/auth/login` | Público | Devuelve access token y refresh token |
| POST | `/auth/refresh` | Público | Entrega un par nuevo de tokens (rotación) |
| POST | `/auth/logout` | Público | Revoca el refresh token |
| POST | `/roles` | admin | Crea un rol |
| GET | `/roles` | admin | Lista los roles |
| PATCH | `/users/:id/roles` | admin | Asigna roles a un usuario |
| GET | `/users/me` | Autenticado | Perfil del usuario del token |
| GET | `/users` | admin | Lista los usuarios con sus roles |

Las rutas protegidas usan el header `Authorization: Bearer <accessToken>`.
Sin token responden **401**; con token pero sin el rol requerido, **403**.

## Seguridad

- Passwords hasheados con `PasswordHasher` (scrypt) del paquete `@nestjs/authentication`.
- El campo `password` nunca se devuelve (`select: false` en la entidad).
- Entradas validadas con `class-validator` y DTOs; los campos no esperados responden 400.
- Los refresh tokens se guardan en memoria (`allowInMemoryStorage: true`): se pierden al reiniciar la API.
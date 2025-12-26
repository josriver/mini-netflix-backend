# 🎬 Mini-Netflix Backend API

API RESTful escalable para una plataforma de streaming, construida con NestJS, PostgreSQL, TypeORM y Docker.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Local](#️-instalación-local)
- [Instalación con Docker](#-instalación-con-docker)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Estructura del Proyecto](#️-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Pruebas](#-pruebas)
- [Despliegue](#-despliegue)
- [Tecnologías](#-tecnologías)

## ✨ Características

- ✅ **CRUD Completo** para Series y Episodios
- ✅ **Autenticación JWT** con tokens stateless
- ✅ **Validación de Datos** con DTOs y class-validator
- ✅ **Relaciones One-to-Many** entre Series y Episodios
- ✅ **Seguridad por Roles** con Guards
- ✅ **Rutas Públicas** (GET) y **Privadas** (POST, PATCH, DELETE)
- ✅ **Base de Datos PostgreSQL** con TypeORM
- ✅ **Dockerizado** para fácil despliegue
- ✅ **Documentación Completa**

## 📋 Requisitos Previos

### Para instalación local:
- Node.js v18 o superior
- PostgreSQL v14 o superior
- npm v9 o superior

### Para instalación con Docker:
- Docker v20 o superior
- Docker Compose v2 o superior

## 🛠️ Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/josriver/mini-netflix-backend.git
cd mini-netflix-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=mini_netflix
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRATION=24h
PORT=3000
```

### 4. Crear la base de datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE mini_netflix;

# Salir
\q
```

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La API estará disponible en: **http://localhost:3000**

## 🐳 Instalación con Docker

### Opción más rápida y recomendada

```bash
# 1. Clonar el repositorio
git clone https://github.com/josriver/mini-netflix-backend.git
cd mini-netflix-backend

# 2. Levantar servicios (API + PostgreSQL)
docker-compose up --build

# La API estará disponible en: http://localhost:3000
```

### Comandos útiles de Docker

```bash
# Levantar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar todo (incluye datos de BD)
docker-compose down -v

# Reconstruir sin caché
docker-compose build --no-cache
docker-compose up -d
```

## 📚 Endpoints de la API

### 🔓 Autenticación (Rutas Públicas)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario administrador |
| POST | `/auth/login` | Iniciar sesión y obtener token JWT |

### 📺 Series

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/series` | ❌ | Obtener todas las series con sus episodios |
| GET | `/series/:id` | ❌ | Obtener una serie específica con sus episodios |
| POST | `/series` | ✅ | Crear una nueva serie |
| PATCH | `/series/:id` | ✅ | Actualizar una serie |
| DELETE | `/series/:id` | ✅ | Eliminar una serie |

### 🎬 Episodios

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/episodios` | ❌ | Obtener todos los episodios |
| GET | `/episodios/:id` | ❌ | Obtener un episodio específico |
| GET | `/episodios/serie/:serieId` | ❌ | Obtener episodios de una serie |
| POST | `/episodios` | ✅ | Crear un nuevo episodio |
| PATCH | `/episodios/:id` | ✅ | Actualizar un episodio |
| DELETE | `/episodios/:id` | ✅ | Eliminar un episodio |

## 🔐 Autenticación

#### 1. Registrar un nuevo usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "123456"
  }'
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "role": "user",
  "createdAt": "2024-12-26T10:00:00.000Z"
}
```

#### 2. Iniciar sesión

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "123456"
  }'
```

**Respuesta exitosa:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "role": "user"
  }
}
```

⚠️ **Guarda el `access_token` para usarlo en las peticiones protegidas.**

---

### 📺 Operaciones con Series

#### 1. Listar todas las series (Público)

```bash
curl http://localhost:3000/series
```

#### 2. Ver una serie específica con episodios (Público)

```bash
curl http://localhost:3000/series/1
```

#### 3. Crear una serie (Requiere autenticación)

```bash
curl -X POST http://localhost:3000/series \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "titulo": "Breaking Bad",
    "genero": "Drama",
    "sinopsis": "Un profesor de química se convierte en fabricante de metanfetaminas",
    "urlPortada": "https://example.com/breaking-bad.jpg"
  }'
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "titulo": "Breaking Bad",
  "genero": "Drama",
  "sinopsis": "Un profesor de química se convierte en fabricante de metanfetaminas",
  "urlPortada": "https://example.com/breaking-bad.jpg"
}
```

#### 4. Actualizar una serie (Requiere autenticación)

```bash
curl -X PATCH http://localhost:3000/series/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "sinopsis": "Nueva sinopsis actualizada"
  }'
```

#### 5. Eliminar una serie (Requiere autenticación)

```bash
curl -X DELETE http://localhost:3000/series/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

### 🎞️ Operaciones con Episodios

#### 1. Listar todos los episodios (Público)

```bash
curl http://localhost:3000/episodios
```

#### 2. Ver un episodio específico (Público)

```bash
curl http://localhost:3000/episodios/1
```

#### 3. Crear un episodio (Requiere autenticación)

```bash
curl -X POST http://localhost:3000/episodios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "titulo": "Pilot",
    "duracion": 58,
    "numeroCapitulo": 1,
    "serieId": 1
  }'
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "titulo": "Pilot",
  "duracion": 58,
  "numeroCapitulo": 1,
  "serieId": 1
}
```

#### 4. Actualizar un episodio (Requiere autenticación)

```bash
curl -X PATCH http://localhost:3000/episodios/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "duracion": 60
  }'
```

#### 5. Eliminar un episodio (Requiere autenticación)

```bash
curl -X DELETE http://localhost:3000/episodios/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```


## 🏗️ Estructura del Proyecto

```
mini-netflix-backend/
├── src/
│   ├── auth/                      # Módulo de autenticación
│   │   ├── decorators/            # Decoradores personalizados
│   │   │   └── public.decorator.ts
│   │   ├── dto/                   # DTOs de autenticación
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── guards/                # Guards de seguridad
│   │   │   └── jwt-auth.guard.ts
│   │   ├── strategies/            # Estrategias de Passport
│   │   │   └── jwt.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── user.entity.ts
│   ├── series/                    # Módulo de series
│   │   ├── dto/
│   │   │   ├── create-serie.dto.ts
│   │   │   └── update-serie.dto.ts
│   │   ├── serie.entity.ts
│   │   ├── series.controller.ts
│   │   ├── series.module.ts
│   │   └── series.service.ts
│   ├── episodios/                 # Módulo de episodios
│   │   ├── dto/
│   │   │   ├── create-episodio.dto.ts
│   │   │   └── update-episodio.dto.ts
│   │   ├── episodio.entity.ts
│   │   ├── episodios.controller.ts
│   │   ├── episodios.module.ts
│   │   └── episodios.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── .dockerignore
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

## 🔧 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Host de PostgreSQL | `localhost` o `postgres` (Docker) |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USERNAME` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `tu_password` |
| `DB_DATABASE` | Nombre de la base de datos | `mini_netflix` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `tu_secreto_123` |
| `JWT_EXPIRATION` | Tiempo de expiración del token | `24h` |
| `PORT` | Puerto de la aplicación | `3000` |

## 🧪 Pruebas

### Verificar que la API funciona

```bash
# 1. Salud del servidor
curl http://localhost:3000

# 2. Ver todas las series (público)
curl http://localhost:3000/series

# 3. Intentar crear serie sin token (debe fallar con 401)
curl -X POST http://localhost:3000/series \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Test","genero":"Test","sinopsis":"Test","urlPortada":"https://test.com"}'
```

## 🚀 Despliegue

### Render (Recomendado)

1. Sube tu código a GitHub
2. Crea una cuenta en [Render](https://render.com)
3. Conecta tu repositorio
4. Render detectará el `render.yaml` automáticamente
5. Configura las variables de entorno
6. Despliega

### Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Desplegar
railway up
```

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con **bcrypt** (10 rounds)
- ✅ Tokens **JWT stateless** con expiración
- ✅ **Guards** para proteger rutas
- ✅ **ValidationPipe** con whitelist activado
- ✅ **CORS** configurado
- ✅ Contenedores Docker con **usuarios no-root**

## 🧩 Validaciones

El proyecto usa `class-validator` con las siguientes configuraciones:

- **whitelist: true** - Elimina propiedades no definidas en DTOs
- **forbidNonWhitelisted: true** - Rechaza requests con datos extra
- **transform: true** - Transforma tipos automáticamente

## 🔗 Relaciones de Base de Datos

```
Serie (1) ←→ (N) Episodio

Una Serie puede tener muchos Episodios
Un Episodio pertenece a una sola Serie

- Cascade: true (crear episodios al crear serie)
- Eager: true (cargar episodios automáticamente)
- OnDelete: CASCADE (eliminar episodios si se elimina la serie)
```

## 📦 Tecnologías

- **Framework:** NestJS 10
- **Lenguaje:** TypeScript 5
- **Base de Datos:** PostgreSQL 15
- **ORM:** TypeORM 0.3
- **Autenticación:** JWT + Passport
- **Validación:** class-validator + class-transformer
- **Encriptación:** bcrypt
- **Containerización:** Docker + Docker Compose

## 👨‍💻 Autor

**JOSE RIVERA**
- GitHub: [@josriver](https://github.com/josriver)




---

⭐ Si te fue útil este proyecto, ¡dale una estrella en GitHub!
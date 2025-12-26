# ==============================================================
# Dockerfile Multi-Stage para NestJS
# ==============================================================

# ========== FASE 1: Build ==========
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# ========== FASE 2: Production ==========
FROM node:18-alpine AS production

# Instalar dumb-init para manejo de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar dependencias desde stage de build
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copiar código compilado
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Cambiar a usuario no-root
USER nestjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto (se sobrescriben en docker-compose)
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["dumb-init", "node", "dist/main"]
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getWelcome() {
    return {
      message: '🎬 Bienvenido a Mini-Netflix API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: {
          register: 'POST /auth/register',
          login: 'POST /auth/login',
        },
        series: {
          getAll: 'GET /series',
          getOne: 'GET /series/:id',
          create: 'POST /series (requiere auth)',
          update: 'PATCH /series/:id (requiere auth)',
          delete: 'DELETE /series/:id (requiere auth)',
        },
        episodios: {
          getAll: 'GET /episodios',
          getOne: 'GET /episodios/:id',
          create: 'POST /episodios (requiere auth)',
          update: 'PATCH /episodios/:id (requiere auth)',
          delete: 'DELETE /episodios/:id (requiere auth)',
        },
      },
      documentation: 'Visita /health para verificar el estado de la API',
    };
  }

  @Public()
  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
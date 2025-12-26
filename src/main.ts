import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para desarrollo
  app.enableCors();

  // Configuración global del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Transforma tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true, // Convierte tipos implícitamente
      },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  console.log(`📚 API Endpoints:`);
  console.log(`   GET  http://localhost:${port}/`);
  console.log(`   GET  http://localhost:${port}/series`);
  console.log(`   GET  http://localhost:${port}/episodios`);
}
bootstrap();
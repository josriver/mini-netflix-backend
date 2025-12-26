import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { Serie } from './serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Serie])],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [TypeOrmModule], // Exportar para que otros módulos puedan usar Serie
})
export class SeriesModule {}
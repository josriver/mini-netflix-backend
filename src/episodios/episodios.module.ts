
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodiosService } from './episodios.service';
import { EpisodiosController } from './episodios.controller';
import { Episodio } from './episodio.entity';
import { SeriesModule } from '../series/series.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episodio]),
    SeriesModule, // Importar para acceder a la entidad Serie
  ],
  controllers: [EpisodiosController],
  providers: [EpisodiosService],
})
export class EpisodiosModule {}

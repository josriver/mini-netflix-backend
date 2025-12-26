import { Module } from '@nestjs/common';
import { EpisodiosController } from './episodios.controller';
import { EpisodiosService } from './episodios.service';

@Module({
  controllers: [EpisodiosController],
  providers: [EpisodiosService]
})
export class EpisodiosModule {}

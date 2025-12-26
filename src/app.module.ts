import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeriesModule } from './series/series.module';
import { EpisodiosModule } from './episodios/episodios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SeriesModule, EpisodiosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

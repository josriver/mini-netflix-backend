import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpisodiosService } from './episodios.service';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('episodios')
export class EpisodiosController {
  constructor(private readonly episodiosService: EpisodiosService) {}

  @Post()
  create(@Body() createEpisodioDto: CreateEpisodioDto) {
    return this.episodiosService.create(createEpisodioDto);
  }

  @Public() // Ruta pública
  @Get()
  findAll() {
    return this.episodiosService.findAll();
  }

  @Public() // Ruta pública
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodioDto: UpdateEpisodioDto) {
    return this.episodiosService.update(+id, updateEpisodioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodiosService.remove(+id);
  }
}

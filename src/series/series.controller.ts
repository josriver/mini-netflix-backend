import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.seriesService.create(createSerieDto);
  }

  @Public() 
  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Public() 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
    return this.seriesService.update(+id, updateSerieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private serieRepository: Repository<Serie>,
  ) {}

  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    const serie = this.serieRepository.create(createSerieDto);
    return await this.serieRepository.save(serie);
  }

  async findAll(): Promise<Serie[]> {
    // Incluir los episodios relacionados
    return await this.serieRepository.find({
      relations: ['episodios'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Serie> {
    const serie = await this.serieRepository.findOne({
      where: { id },
      relations: ['episodios'],
    });

    if (!serie) {
      throw new NotFoundException(`Serie con ID ${id} no encontrada`);
    }

    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSerieDto): Promise<Serie> {
    const serie = await this.findOne(id);
    
    // Actualizar los campos
    Object.assign(serie, updateSerieDto);
    
    return await this.serieRepository.save(serie);
  }

  async remove(id: number): Promise<void> {
    const serie = await this.findOne(id);
    await this.serieRepository.remove(serie);
  }
}

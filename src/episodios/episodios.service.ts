import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodio } from './episodio.entity';
import { Serie } from '../series/serie.entity';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';

@Injectable()
export class EpisodiosService {
  constructor(
    @InjectRepository(Episodio)
    private episodioRepository: Repository<Episodio>,
    @InjectRepository(Serie)
    private serieRepository: Repository<Serie>,
  ) {}

  async create(createEpisodioDto: CreateEpisodioDto): Promise<Episodio> {
    // Verificar que la serie existe
    const serie = await this.serieRepository.findOne({
      where: { id: Number(createEpisodioDto.serieId) },
    });

    if (!serie) {
      throw new BadRequestException(
        `Serie con ID ${createEpisodioDto.serieId} no existe`,
      );
    }

    // Crear el episodio con los datos correctos
    const episodio = this.episodioRepository.create({
      titulo: createEpisodioDto.titulo,
      duracion: createEpisodioDto.duracion,
      numeroCapitulo: createEpisodioDto.numeroCapitulo,
      serieId: createEpisodioDto.serieId,
    });

    return await this.episodioRepository.save(episodio);
  }

  async findAll(): Promise<Episodio[]> {
    // Incluir la serie relacionada
    return await this.episodioRepository.find({
      relations: ['serie'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Episodio> {
    const episodio = await this.episodioRepository.findOne({
      where: { id },
      relations: ['serie'],
    });

    if (!episodio) {
      throw new NotFoundException(`Episodio con ID ${id} no encontrado`);
    }

    return episodio;
  }

  async update(id: number, updateEpisodioDto: UpdateEpisodioDto): Promise<Episodio> {
    const episodio = await this.findOne(id);

    // Si se actualiza el serieId, verificar que la nueva serie existe
    if (updateEpisodioDto.serieId && Number(updateEpisodioDto.serieId) !== episodio.serieId) {
      const serie = await this.serieRepository.findOne({
        where: { id: Number(updateEpisodioDto.serieId) },
      });

      if (!serie) {
        throw new BadRequestException(
          `Serie con ID ${updateEpisodioDto.serieId} no existe`,
        );
      }
    }

    // Actualizar los campos manualmente para asegurar tipos correctos
    if (updateEpisodioDto.titulo !== undefined) {
      episodio.titulo = updateEpisodioDto.titulo;
    }
    if (updateEpisodioDto.duracion !== undefined) {
      episodio.duracion = updateEpisodioDto.duracion;
    }
    if (updateEpisodioDto.numeroCapitulo !== undefined) {
      episodio.numeroCapitulo = updateEpisodioDto.numeroCapitulo;
    }
    if (updateEpisodioDto.serieId !== undefined) {
      episodio.serieId = updateEpisodioDto.serieId;
    }

    return await this.episodioRepository.save(episodio);
  }

  async remove(id: number): Promise<void> {
    const episodio = await this.findOne(id);
    await this.episodioRepository.remove(episodio);
  }
}
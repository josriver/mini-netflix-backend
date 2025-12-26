/**
 * DTO para crear un nuevo episodio
 * Un episodio DEBE estar asociado a una serie 
 */
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEpisodioDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  titulo: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'La duración debe ser un número' })
  @IsPositive({ message: 'La duración debe ser positiva' })
  duracion: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'El número de capítulo debe ser un número' })
  @IsPositive({ message: 'El número de capítulo debe ser positivo' })
  numeroCapitulo: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'El ID de la serie debe ser un número' })
  @IsPositive({ message: 'El ID de la serie debe ser positivo' })
  serieId: number;
}
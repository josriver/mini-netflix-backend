import { IsString, IsNotEmpty, IsInt, Min, IsUUID, MaxLength } from 'class-validator';

/**
 * DTO para crear un nuevo episodio
 * Un episodio DEBE estar asociado a una serie (serieId)
 */
export class CreateEpisodioDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(255, { message: 'El título no puede exceder 255 caracteres' })
  titulo: string;

  @IsInt({ message: 'La duración debe ser un número entero' })
  @Min(1, { message: 'La duración debe ser al menos 1 minuto' })
  duracion: number;

  @IsInt({ message: 'El número de capítulo debe ser un número entero' })
  @Min(1, { message: 'El número de capítulo debe ser al menos 1' })
  numeroCapitulo: number;

  @IsUUID('4', { message: 'El ID de la serie debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la serie es obligatorio' })
  serieId: string; // ID de la serie a la que pertenece
}
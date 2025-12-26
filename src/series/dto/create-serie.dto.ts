import { IsString, IsNotEmpty, IsUrl, MinLength, MaxLength } from 'class-validator';

/**
 * DTO para crear una nueva serie
 * Define qué datos son necesarios y sus validaciones
 */
export class CreateSerieDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(1, { message: 'El título debe tener al menos 1 carácter' })
  @MaxLength(255, { message: 'El título no puede exceder 255 caracteres' })
  titulo: string;

  @IsString({ message: 'El género debe ser un texto' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  @MaxLength(100, { message: 'El género no puede exceder 100 caracteres' })
  genero: string;

  @IsString({ message: 'La sinopsis debe ser un texto' })
  @IsNotEmpty({ message: 'La sinopsis es obligatoria' })
  sinopsis: string;

  @IsUrl({}, { message: 'La URL de la portada debe ser válida' })
  @IsNotEmpty({ message: 'La URL de la portada es obligatoria' })
  urlPortada: string;
}
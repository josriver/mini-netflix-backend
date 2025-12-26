import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateSerieDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  titulo: string;

  @IsString({ message: 'El género debe ser un texto' })
  @IsNotEmpty({ message: 'El género es requerido' })
  genero: string;

  @IsString({ message: 'La sinopsis debe ser un texto' })
  @IsNotEmpty({ message: 'La sinopsis es requerida' })
  sinopsis: string;

  @IsUrl({}, { message: 'La URL de la portada debe ser válida' })
  @IsNotEmpty({ message: 'La URL de la portada es requerida' })
  urlPortada: string;
}
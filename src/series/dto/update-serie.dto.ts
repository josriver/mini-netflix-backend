import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieDto } from './create-serie.dto';

/**
 * DTO para actualizar una serie
 * PartialType hace que todos los campos sean opcionales
 * Hereda todas las validaciones de CreateSerieDto
 */
export class UpdateSerieDto extends PartialType(CreateSerieDto) {
  // No necesita campos adicionales
  // Todos los campos de CreateSerieDto ahora son opcionales
}
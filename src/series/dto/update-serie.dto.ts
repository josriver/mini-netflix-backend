import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieDto } from './create-serie.dto';

/**
 * DTO para actualizar una serie
 */
export class UpdateSerieDto extends PartialType(CreateSerieDto) {
  // No necesita campos adicionales
  
}
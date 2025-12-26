import { IsString, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO para registrar un nuevo usuario
 */
export class RegisterDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  username: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
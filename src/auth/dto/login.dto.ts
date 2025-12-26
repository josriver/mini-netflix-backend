import { IsString, IsNotEmpty } from 'class-validator';
/**
 * DTO para login de usuario
 */
export class LoginDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
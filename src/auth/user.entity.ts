import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

/**
 * Entidad User - Representa un usuario administrador del sistema
 */
@Entity('users') // Nombre de la tabla en la BD
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  username: string; // Usuario único

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string; // Password hasheado con bcrypt

  @Column({ type: 'varchar', length: 50, default: 'admin' })
  role: string; // Rol del usuario (admin por defecto)

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
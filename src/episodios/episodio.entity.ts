import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Serie } from '../series/serie.entity';

/**
 * Entidad Episodio - Representa un episodio de una serie
 * Cada episodio pertenece a UNA SOLA serie (relación N:1)
 */
@Entity('episodios') // Nombre de la tabla en la BD
export class Episodio {
  @PrimaryGeneratedColumn('uuid') // ID único generado automáticamente
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'int', nullable: false })
  duracion: number; // Duración en minutos

  @Column({ type: 'int', nullable: false })
  numeroCapitulo: number; // Número del capítulo (1, 2, 3, etc.)

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  /**
   * RELACIÓN MANY-TO-ONE
   * Muchos Episodios pertenecen a una Serie
   * - onDelete: 'CASCADE' → Si se elimina la serie, se eliminan sus episodios
   */
  @ManyToOne(() => Serie, (serie) => serie.episodios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serieId' }) // Nombre de la columna FK en la BD
  serie: Serie;

  /**
   * Foreign Key explícita
   * Almacena el ID de la serie a la que pertenece este episodio
   */
  @Column({ type: 'uuid', nullable: false })
  serieId: string;
}
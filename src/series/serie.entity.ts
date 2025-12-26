import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Episodio } from '../episodios/episodio.entity';

/**
 * Entidad Serie - Representa una serie de TV en la base de datos
 * Una serie puede tener múltiples episodios (relación 1:N)
 */
@Entity('series') // Nombre de la tabla en la BD
export class Serie {
  @PrimaryGeneratedColumn('uuid') // ID único generado automáticamente
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  genero: string;

  @Column({ type: 'text', nullable: false })
  sinopsis: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  urlPortada: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  /**
   * RELACIÓN ONE-TO-MANY
   * Una Serie tiene muchos Episodios
   * - cascade: true → Al crear/actualizar una serie, afecta sus episodios
   * - eager: true → Al consultar una serie, trae automáticamente sus episodios
   */
  @OneToMany(() => Episodio, (episodio) => episodio.serie, {
    cascade: true,
    eager: true,
  })
  episodios: Episodio[];
}
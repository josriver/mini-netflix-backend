import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Serie } from '../series/serie.entity';

@Entity('episodios')
export class Episodio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  duracion: number; // duración en minutos

  @Column()
  numeroCapitulo: number;

  // Relación: Un Episodio pertenece a una Serie (Foreign Key)
  @ManyToOne(() => Serie, (serie) => serie.episodios, {
    onDelete: 'CASCADE', // Si se elimina la serie, se eliminan sus episodios
  })
  @JoinColumn({ name: 'serieId' })
  serie: Serie;

  @Column()
  serieId: number; // Foreign Key explícita
}
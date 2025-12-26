import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Episodio } from '../episodios/episodio.entity';

@Entity('series')
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  genero: string;

  @Column('text')
  sinopsis: string;

  @Column()
  urlPortada: string;

  // Relación: Una Serie tiene muchos Episodios
  @OneToMany(() => Episodio, (episodio) => episodio.serie, {
    cascade: true, // Permite crear episodios al crear una serie
  })
  episodios: Episodio[];
}
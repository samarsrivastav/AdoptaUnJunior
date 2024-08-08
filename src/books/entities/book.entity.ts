import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Publisher } from '../../publishers/entities/publisher.entity';
import { Author } from '../../authors/entities/author.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  
  @Column({ nullable: true })
  publishedYear: number;

  @ManyToOne(() => Publisher, publisher => publisher.books)
  publisher: Publisher;

  @ManyToMany(() => Author, author => author.books)
  @JoinTable()
  authors: Author[];

  @ManyToMany(() => Genre, genre => genre.books)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Category, category => category.books)
  @JoinTable()
  categories: Category[];
}

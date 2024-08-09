import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  country: string;

  @ManyToMany(() => Book, book => book.authors)
  books: Book[];

  @BeforeInsert()
  @BeforeUpdate()
  nameToTitleCase() {
    this.name = this.titleCase(this.name);
  }

  private titleCase(name: string): string {
    return name
      .toLowerCase() 
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ');
  }
}

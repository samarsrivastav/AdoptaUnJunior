import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { GenresModule } from 'src/genres/genres.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PublishersModule } from 'src/publishers/publishers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Publisher } from 'src/publishers/entities/publisher.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    AuthorsModule,
    GenresModule,
    CategoriesModule,
    PublishersModule,
    TypeOrmModule.forFeature([Book, Author, Publisher, Category])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { GenresModule } from 'src/genres/genres.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PublishersModule } from 'src/publishers/publishers.module';

@Module({
  imports: [
    AuthorsModule,
    GenresModule,
    CategoriesModule,
    PublishersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

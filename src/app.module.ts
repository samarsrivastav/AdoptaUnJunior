import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { PublishersModule } from './publishers/publishers.module';
import { CategoriesModule } from './categories/categories.module';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/entities/author.entity';
import { Genre } from './genres/entities/genre.entity';
import { Publisher } from './publishers/entities/publisher.entity';
import { Category } from './categories/entities/category.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [
      Book, 
      Author, 
      Genre, 
      Publisher, 
      Category,
    ],
    synchronize: true
  }),
  BooksModule, 
  AuthorsModule, 
  GenresModule, 
  PublishersModule, 
  CategoriesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { forwardRef, Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { BooksModule } from '../books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [
    forwardRef(() => BooksModule),
    TypeOrmModule.forFeature([Genre])
  ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}

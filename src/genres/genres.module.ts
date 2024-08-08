import { forwardRef, Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}

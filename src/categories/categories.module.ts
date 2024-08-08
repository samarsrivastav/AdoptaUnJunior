import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

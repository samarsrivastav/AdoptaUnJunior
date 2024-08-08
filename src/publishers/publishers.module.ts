import { Module, forwardRef } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}

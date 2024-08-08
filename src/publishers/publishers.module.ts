import { Module, forwardRef } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { BooksModule } from '../books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  imports: [
    forwardRef(() => BooksModule),
    TypeOrmModule.forFeature([Publisher])
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}

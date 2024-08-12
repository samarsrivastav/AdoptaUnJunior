import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

class MockBookRepository {}

describe('BooksController', () => {
  let bookController: BooksController;
  let bookService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService,
        { provide: 'BookRepository', useClass: MockBookRepository }
      ],
    }).compile();

    bookController = module.get<BooksController>(BooksController);
    bookService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });
});

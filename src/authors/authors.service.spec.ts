import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';

class MockAuthorRepository {}

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService,
        { provide: 'AuthorRepository', useClass: MockAuthorRepository }
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

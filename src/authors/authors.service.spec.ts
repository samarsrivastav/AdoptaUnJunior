import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';

class MockAuthorRepo {}

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService,
        { provide: 'AuthorRepo', useClass: MockAuthorRepo }
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

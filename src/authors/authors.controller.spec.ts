import { Test } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

class MockAuthorRepository {}

describe('AuthorsController', () => {
  let authorsController: AuthorsController;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService,
        { provide: 'AuthorRepository', useClass: MockAuthorRepository },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    authorsController = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(authorsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = { name: 'John Doe', country: 'USA' };
      const result: Author = { id: 1, ...createAuthorDto } as Author;
      jest.spyOn(authorsService, 'create').mockResolvedValue(result);

      expect(await authorsController.create(createAuthorDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const result: Author[] = [{ id: 1, name: 'John Doe', country: 'USA' }] as Author[];
      jest.spyOn(authorsService, 'findAll').mockResolvedValue(result);

      expect(await authorsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      const result: Author = { id: 1, name: 'John Doe', country: 'USA' } as Author;
      jest.spyOn(authorsService, 'findOne').mockResolvedValue(result);

      expect(await authorsController.findOne('1')).toBe(result);
    });
  });
});

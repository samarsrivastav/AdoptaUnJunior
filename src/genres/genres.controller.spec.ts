import { Test } from '@nestjs/testing';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';

class MockGenreRepository {}

describe('GenresController', () => {
  let genresController: GenresController;
  let genresService: GenresService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenresService,
        { provide: 'GenreRepository', useClass: MockGenreRepository },
      ],
    }).compile();

    genresService = module.get<GenresService>(GenresService);
    genresController = module.get<GenresController>(GenresController);
  });

  it('should be defined', () => {
    expect(genresController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new genre', async () => {
      const createGenreDto: CreateGenreDto = { name: 'Historical Fantasy', description: '...' };
      const result: Genre = { id: 1, ...createGenreDto } as Genre;
      jest.spyOn(genresService, 'create').mockResolvedValue(result);

      expect(await genresController.create(createGenreDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of genres', async () => {
      const result: Genre[] = [{ id: 1, name: 'Historical Fantasy', description: '...' }] as Genre[];
      jest.spyOn(genresService, 'findAll').mockResolvedValue(result);

      expect(await genresController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single genre', async () => {
      const result: Genre = { id: 1, name: 'Historical Fantasy', description: '...' } as Genre;
      jest.spyOn(genresService, 'findOne').mockResolvedValue(result);

      expect(await genresController.findOne('1')).toBe(result);
    });
  });
});

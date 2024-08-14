import { Test, TestingModule } from '@nestjs/testing';
import { GenresService } from './genres.service';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

describe('GenresService', () => {
  let service: GenresService;
  let repository: Repository<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: getRepositoryToken(Genre),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
    repository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new genre', async () => {
      const createGenreDto: CreateGenreDto = { name: 'Historical Fantasy', description: '...' };
      const savedGenre = { id: 1, ...createGenreDto } as Genre;

      jest.spyOn(repository, 'create').mockReturnValue(savedGenre);
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest.spyOn(repository, 'save').mockResolvedValue(savedGenre);

      const result = await service.create(createGenreDto);
      expect(result).toEqual(savedGenre);
      expect(repository.create).toHaveBeenCalledWith(createGenreDto);
      expect(repository.exists).toHaveBeenCalledWith({ where: { name: 'John Doe' } });
      expect(repository.save).toHaveBeenCalledWith(savedGenre);
    });
  });

  describe('findAll', () => {
    it('should return an array of genres', async () => {
      const genres = [{ id: 1, name: 'Historical Fantasy', description: '...' }] as Genre[];

      jest.spyOn(repository, 'find').mockResolvedValue(genres);

      const result = await service.findAll();
      expect(result).toEqual(genres);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should return an empty array if no genres are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single genre', async () => {
      const genre = { id: 1, name: 'Historical Fantasy', description: '...' } as Genre;

      jest.spyOn(repository, 'findOneByOrFail').mockResolvedValue(genre);

      const result = await service.findOne(1);
      expect(result).toEqual(genre);
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update an existing genre', async () => {
      const genre = { id: 1, name: 'Historical Fantasy', description: '...' } as Genre;
      const updateGenreDto: UpdateGenreDto = { name: 'Historical Fantasy', description: 'lorem ipsum' };

      jest.spyOn(repository, 'create').mockReturnValue({ ...genre, ...updateGenreDto } as Genre)
      jest.spyOn(repository, 'findOneByOrFail').mockResolvedValue(genre);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...genre, ...updateGenreDto } as Genre);

      const result = await service.update(1, updateGenreDto);

      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(repository.save).toHaveBeenCalledWith({ ...genre, ...updateGenreDto });
    });
  });

  describe('remove', () => {
    it('should remove an genre and return void', async () => {
      jest.spyOn(repository, 'existsBy').mockResolvedValue(true);
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

      const result = await service.remove(1);
      expect(result).toBeUndefined();
      expect(repository.existsBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});

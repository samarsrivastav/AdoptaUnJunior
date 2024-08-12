import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = { name: 'John Doe', country: 'USA' };
      const savedAuthor = { id: 1, ...createAuthorDto } as Author;

      jest.spyOn(repository, 'create').mockReturnValue(savedAuthor);
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest.spyOn(repository, 'save').mockResolvedValue(savedAuthor);

      const result = await service.create(createAuthorDto);
      expect(result).toEqual(savedAuthor);
      expect(repository.create).toHaveBeenCalledWith(createAuthorDto);
      expect(repository.exists).toHaveBeenCalledWith({ where: { name: 'John Doe' } });
      expect(repository.save).toHaveBeenCalledWith(savedAuthor);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const authors = [{ id: 1, name: 'John Doe', country: 'USA' }] as Author[];

      jest.spyOn(repository, 'find').mockResolvedValue(authors);

      const result = await service.findAll();
      expect(result).toEqual(authors);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should return an empty array if no authors are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      const author = { id: 1, name: 'John Doe', country: 'USA' } as Author;

      jest.spyOn(repository, 'findOneByOrFail').mockResolvedValue(author);

      const result = await service.findOne(1);
      expect(result).toEqual(author);
      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update an existing author', async () => {
      const author = { id: 1, name: 'John Doe', country: 'USA' } as Author;
      const updateAuthorDto: UpdateAuthorDto = { name: 'John Smith', country: 'UK' };

      jest.spyOn(repository, 'create').mockReturnValue({ ...author, ...updateAuthorDto } as Author)
      jest.spyOn(repository, 'findOneByOrFail').mockResolvedValue(author);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...author, ...updateAuthorDto } as Author);

      const result = await service.update(1, updateAuthorDto);

      expect(repository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(repository.save).toHaveBeenCalledWith({ ...author, ...updateAuthorDto });
    });
  });

  describe('remove', () => {
    it('should remove an author and return void', async () => {
      jest.spyOn(repository, 'existsBy').mockResolvedValue(true);
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);

      const result = await service.remove(1);
      expect(result).toBeUndefined();
      expect(repository.existsBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});

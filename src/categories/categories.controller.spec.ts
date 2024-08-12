import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

class MockCategoryRepository {}

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService,
        { provide: 'CategoryRepository', useClass: MockCategoryRepository }
      ],
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Romance', description: '...' };
      const result: Category = { id: 1, ...createCategoryDto } as Category;
      jest.spyOn(categoriesService, 'create').mockResolvedValue(result);

      expect(await categoriesController.create(createCategoryDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result: Category[] = [{ id: 1, name: 'Romance', description: '...' }] as Category[];
      jest.spyOn(categoriesService, 'findAll').mockResolvedValue(result);

      expect(await categoriesController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const result: Category = { id: 1, name: 'Romance', description: '...' } as Category;
      jest.spyOn(categoriesService, 'findOne').mockResolvedValue(result);

      expect(await categoriesController.findOne('1')).toBe(result);
    });
  });
});

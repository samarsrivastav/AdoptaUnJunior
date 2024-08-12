import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

class MockCategoryRepository {}

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService,
        { provide: 'CategoryRepository', useClass: MockCategoryRepository }
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

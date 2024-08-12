import { Test, TestingModule } from '@nestjs/testing';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';
import { Publisher } from './entities/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';

class MockPubliserRepository {}

describe('PublishersController', () => {
  let publishersController: PublishersController;
  let publishersService: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishersController],
      providers: [PublishersService,
        {provide: 'PublisherRepository', useClass: MockPubliserRepository}
      ],
    }).compile();

    publishersService = module.get<PublishersService>(PublishersService);
    publishersController = module.get<PublishersController>(PublishersController);

  });

  it('should be defined', () => {
    expect(publishersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new publisher', async () => {
      const createPublisherDto: CreatePublisherDto = { name: 'Penguin', country: 'USA', website: 'http:www.penguin.lol' };
      const result: Publisher = { id: 1, ...createPublisherDto } as Publisher;
      jest.spyOn(publishersService, 'create').mockResolvedValue(result);

      expect(await publishersController.create(createPublisherDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of publishers', async () => {
      const result: Publisher[] = [{ id: 1, name: 'Penguin', country: 'USA', website: 'http:www.penguin.lol' }] as Publisher[];
      jest.spyOn(publishersService, 'findAll').mockResolvedValue(result);

      expect(await publishersController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single publisher', async () => {
      const result: Publisher = { id: 1, name: 'Penguin', country: 'USA', website: 'http:www.penguin.lol' } as Publisher;
      jest.spyOn(publishersService, 'findOne').mockResolvedValue(result);

      expect(await publishersController.findOne('1')).toBe(result);
    });
  });
});
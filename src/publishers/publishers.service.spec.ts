import { Test, TestingModule } from '@nestjs/testing';
import { PublishersService } from './publishers.service';

class MockPublisherRepository {}

describe('PublishersService', () => {
  let service: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishersService,
        { provide: 'PublisherRepository', useClass: MockPublisherRepository}
      ],
    }).compile();

    service = module.get<PublishersService>(PublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

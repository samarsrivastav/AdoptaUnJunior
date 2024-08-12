import { Test, TestingModule } from '@nestjs/testing';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

class MockPubliserRepository {}

describe('PublishersController', () => {
  let controller: PublishersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishersController],
      providers: [PublishersService,
        {provide: 'PublisherRepository', useClass: MockPubliserRepository}
      ],
    }).compile();

    controller = module.get<PublishersController>(PublishersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

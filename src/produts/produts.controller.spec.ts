import { Test, TestingModule } from '@nestjs/testing';
import { ProdutsController } from './produts.controller';
import { ProdutsService } from './produts.service';

describe('ProdutsController', () => {
  let controller: ProdutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutsController],
      providers: [ProdutsService],
    }).compile();

    controller = module.get<ProdutsController>(ProdutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

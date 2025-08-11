import { Test, TestingModule } from '@nestjs/testing';
import { ConceitosManualController } from './conceitos-manual.controller';

describe('ConceitosManualController', () => {
  let controller: ConceitosManualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceitosManualController],
    }).compile();

    controller = module.get<ConceitosManualController>(ConceitosManualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

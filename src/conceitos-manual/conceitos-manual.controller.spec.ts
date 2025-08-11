import { Test, TestingModule } from '@nestjs/testing';
import { ConceitosManualController } from './conceitos-manual.controller';
import { ConceitosManualService } from './conceitos-manual.service';
describe('ConceitosManualController', () => {
  let controller: ConceitosManualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceitosManualController],
      providers: [ConceitosManualService],
    }).compile();

    controller = module.get<ConceitosManualController>(
      ConceitosManualController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

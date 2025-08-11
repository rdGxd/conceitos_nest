import { Test, TestingModule } from '@nestjs/testing';
import { ConceitosCliService } from './conceitos-cli.service';

describe('ConceitosCliService', () => {
  let service: ConceitosCliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceitosCliService],
    }).compile();

    service = module.get<ConceitosCliService>(ConceitosCliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

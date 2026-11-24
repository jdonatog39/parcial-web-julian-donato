import { Test, TestingModule } from '@nestjs/testing';
import { ParkingspotsService } from './parkingspots.service.js';

describe('ParkingspotsService', () => {
  let service: ParkingspotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingspotsService],
    }).compile();

    service = module.get<ParkingspotsService>(ParkingspotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

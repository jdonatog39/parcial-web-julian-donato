import { Test, TestingModule } from '@nestjs/testing';
import { ParkingspotsController } from './parkingspots.controller.js';
import { ParkingspotsService } from './parkingspots.service.js';

describe('ParkingspotsController', () => {
  let controller: ParkingspotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingspotsController],
      providers: [ParkingspotsService],
    }).compile();

    controller = module.get<ParkingspotsController>(ParkingspotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

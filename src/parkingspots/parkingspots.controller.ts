import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingspotsService } from './parkingspots.service.js';
import { CreateParkingspotDto } from './dto/create-parkingspot.dto.js';
import { UpdateParkingspotDto } from './dto/update-parkingspot.dto.js';

@Controller('parkingspots')
export class ParkingspotsController {
  constructor(private readonly parkingspotsService: ParkingspotsService) {}

  @Post()
  create(@Body() createParkingspotDto: CreateParkingspotDto) {
    return this.parkingspotsService.create(createParkingspotDto);
  }

  @Get()
  findAll() {
    return this.parkingspotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingspotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingspotDto: UpdateParkingspotDto) {
    return this.parkingspotsService.update(+id, updateParkingspotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingspotsService.remove(+id);
  }
}

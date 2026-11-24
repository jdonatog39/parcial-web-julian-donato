import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingspotsService } from './parkingspots.service.js';
import { CreateParkingspotDto } from './dto/create-parkingspot.dto.js';
import { UpdateParkingspotDto } from './dto/update-parkingspot.dto.js';
import { Parkingspot } from './entities/parkingspot.entity.js';
import { parse } from 'next/dist/build/swc/index.js';
import { parkingPolicy } from './parkingspot.policy.js';
import { Can } from '@nestjs/authorization';
@Controller('parkingspots')
export class ParkingspotsController {
  constructor(private readonly parkingspotsService: ParkingspotsService) {}

  @Can(parkingPolicy, 'crearPuesto')
  @Post()
  create(@Body() createParkingspotDto: CreateParkingspotDto) {
    return this.parkingspotsService.create(createParkingspotDto);
  }

  @Can(parkingPolicy, 'list')
  @Get()
  findAll() {
    return this.parkingspotsService.findAll();
  }

  @Can(parkingPolicy, 'puesto')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingspotsService.findOne(+id);
  }

  @Can(parkingPolicy, 'update')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingspotDto: UpdateParkingspotDto) {
    return this.parkingspotsService.update(+id, updateParkingspotDto);
  }

  @Can(parkingPolicy, 'delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingspotsService.remove(+id);
  }
}

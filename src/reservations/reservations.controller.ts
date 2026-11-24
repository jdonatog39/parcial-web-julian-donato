import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode  } from '@nestjs/common';
import { ReservationsService } from './reservations.service.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { Reservation } from './entities/reservation.entity.js';
import { parse } from 'next/dist/build/swc/index.js';
import { reservationPolicy } from './reservation.policy.js';
import { Can } from '@nestjs/authorization';
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Can(reservationPolicy, 'crearReserva')
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }
  @Can(reservationPolicy, 'verReserva')
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Can(reservationPolicy, 'verReserva')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Can(reservationPolicy, 'actualizarReserva')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Can(reservationPolicy, 'delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}

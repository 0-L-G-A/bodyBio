import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsersAppointmentsService } from "../services/apointment.service";
import { CreateAppointmentDto } from "../dtos/apointment.dto";
import { Appointment } from "@app/entities/UsersAppointment";

@Controller('users-appointments')
export class UsersAppointmentsController {
    constructor(private readonly usersAppointmentsService: UsersAppointmentsService) {}

    @Post()
    async create(@Body() createDto: CreateAppointmentDto): Promise<Appointment> {
      return this.usersAppointmentsService.create(createDto);
    }
  
    @Get()
    async findAllByUserIdAndBodySystem(
      @Query('userId') userId: string,
      @Query('bodySystemId') bodySystemId?: string,
    ): Promise<Appointment[]> {
      return this.usersAppointmentsService.findAllByUserIdAndBodySystem(userId, bodySystemId);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Appointment | null> {
      return this.usersAppointmentsService.findOne(id);
    }
  
    @Put(':id')
    async edit(@Param('id') id: string, @Body() updateDto: CreateAppointmentDto): Promise<Appointment | null> {
      return this.usersAppointmentsService.edit(id, updateDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
      return this.usersAppointmentsService.delete(id);
    }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@app/entities/UsersAppointment';
import {  UsersAppointmentsController } from './controllers/apointment.controller';
import {  UsersAppointmentsService } from './services/apointment.service';
import { User } from '@app/entities/User';
import { UsersLabs } from '@app/entities/UsersLabs';
import { UsersLabsModule } from '../userLabs/userLabs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, UsersLabs]),
    UsersLabsModule,
  ],
  controllers: [UsersAppointmentsController],
  providers: [UsersAppointmentsService],
})
export class UsersAppointmentModule {}

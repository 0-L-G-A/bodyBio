import { User } from '@app/entities/User';
import { Appointment } from '@app/entities/UsersAppointment';
import { UsersLabs } from '@app/entities/UsersLabs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLabsController } from './controllers/userLabs.controller';
import { UsersLabsService } from './services/userLabs.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersLabs, Appointment, User])],
  controllers: [UsersLabsController],
  providers: [UsersLabsService],
  exports: [UsersLabsService],
})
export class UsersLabsModule {}

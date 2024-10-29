import { User } from '@app/entities/User';
import { Appointment } from '@app/entities/UsersAppointment';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersFindingsController } from './controllers/userFindings.controller';
import { UsersFindingsService } from './services/userFindings.service';
import { UsersFinding } from '@app/entities/UsersFindings';

@Module({
  imports: [TypeOrmModule.forFeature([UsersFinding, Appointment, User])],
  controllers: [UsersFindingsController],
  providers: [UsersFindingsService],
  exports: [UsersFindingsService],
})
export class UsersFindingsModule {}

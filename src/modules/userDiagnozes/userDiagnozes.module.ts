import { User } from '@app/entities/User';
import { Appointment } from '@app/entities/UsersAppointment';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDiagnozesController } from './controllers/userDiagnozes.controller';
import { UsersDiagnozesService } from './services/userDiagnozes.service';
import { UsersDiagnozes } from '@app/entities/UsersDiagnozes';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDiagnozes, Appointment, User])],
  controllers: [UsersDiagnozesController],
  providers: [UsersDiagnozesService],
  exports: [UsersDiagnozesService],
})
export class UsersDiagnozesModule {}

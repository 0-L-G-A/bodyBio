import { Module } from '@nestjs/common';
import { DoctorsSpecsController } from './controllers/doctorsSpecializations.controller';
import { DoctorsSpecsService } from './services/doctorsSpecializations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSpecialization } from '@app/entities/DoctorSpecialization';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorSpecialization])],
  controllers: [DoctorsSpecsController],
  providers: [DoctorsSpecsService],
  exports: [DoctorsSpecsService],
})
export class DoctorSpecsModule {}

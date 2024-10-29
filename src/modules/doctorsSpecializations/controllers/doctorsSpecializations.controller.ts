import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorsSpecsService } from '../services/doctorsSpecializations.service';
import { DoctorsSpecsDto } from '../dtos/doctorsSpecializations.dto';
import { DoctorSpecialization } from '@app/entities/DoctorSpecialization';


@Controller('doctor-specializations')
export class DoctorsSpecsController {
    constructor(private readonly doctorSpecializationService: DoctorsSpecsService) {}

    @Get()
    findAll(): Promise<DoctorSpecialization[]> {
      return this.doctorSpecializationService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<DoctorSpecialization> {
      return this.doctorSpecializationService.findOne(id);
    }
  
    @Post()
    create(@Body() createDto: DoctorsSpecsDto): Promise<DoctorSpecialization> {
      return this.doctorSpecializationService.create(createDto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: DoctorsSpecsDto): Promise<DoctorSpecialization> {
      return this.doctorSpecializationService.update(id, updateDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.doctorSpecializationService.remove(id);
    }

}

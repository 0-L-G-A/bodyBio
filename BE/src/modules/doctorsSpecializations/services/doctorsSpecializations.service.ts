import { DoctorSpecialization } from "@app/entities/DoctorSpecialization";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoctorsSpecsDto } from "../dtos/doctorsSpecializations.dto";


@Injectable()
export class DoctorsSpecsService {
    constructor(
        @InjectRepository(DoctorSpecialization)
        private readonly doctorSpecializationRepository: Repository<DoctorSpecialization>,
      ) {}
    
      async findAll(): Promise<DoctorSpecialization[]> {
        return this.doctorSpecializationRepository.find({ relations: ['bodySystem'] });
      }
    
      async findOne(id: string): Promise<DoctorSpecialization> {
        return this.doctorSpecializationRepository.findOne({ where: { id }, relations: ['bodySystem'] });
      }
    
      async create(createDto: DoctorsSpecsDto): Promise<DoctorSpecialization> {
        const specialization = this.doctorSpecializationRepository.create(createDto);
        return this.doctorSpecializationRepository.save(specialization);
      }
    
      async update(id: string, updateDto: DoctorsSpecsDto): Promise<DoctorSpecialization> {
        await this.doctorSpecializationRepository.update(id, updateDto);
        return this.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.doctorSpecializationRepository.delete(id);
      }

}

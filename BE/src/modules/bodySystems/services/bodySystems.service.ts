import { BodySystem } from "@app/entities/BodySystem";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BodySystemDto } from "../dtos/bodySystems.dto";

@Injectable()
export class BodySystemsService {
    constructor(
        @InjectRepository(BodySystem)
        private bodySystemRepository: Repository<BodySystem>,
    ) {}

    async findAll() {
        return this.bodySystemRepository.find({
            relations: ['doctorsSpecializations'],
        });
    }

    async findOne(id: string): Promise<BodySystem | null> {
        return this.bodySystemRepository.findOne({
            where: { id }, // умова для пошуку по id
            relations: ['doctorsSpecializations', 'laboratories', 'findings', 'diagnozes'], // зв'язки
        });
    }

    async create(createDto: BodySystemDto): Promise<BodySystem> {
        const bodySystem = this.bodySystemRepository.create(createDto);
        return this.bodySystemRepository.save(bodySystem);
    }

    async update(id: string, updateDto: BodySystemDto): Promise<BodySystem> {
      const bodySystem = await this.bodySystemRepository.findOneBy({id}); // Перевірка на існування
      this.bodySystemRepository.merge(bodySystem, updateDto);
      return this.bodySystemRepository.save(bodySystem);
  }

  async delete(id: string): Promise<void> {
     await this.bodySystemRepository.delete(id);
}
}
import { BodySystem } from "@app/entities/BodySystem";
import { Lab } from "@app/entities/Lab";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { LabDto } from "../dtos/labs.dto";

@Injectable()
export class LabsService {
    constructor(
        @InjectRepository(Lab)
        private readonly labRepository: Repository<Lab>,

        @InjectRepository(BodySystem)
        private readonly bodySystemRepository: Repository<BodySystem>,
    ) {}

    async findAll(): Promise<Lab[]> {
        const labs = await this.labRepository.find({ relations: ['bodySystem', 'children', 'parent'] });
        //@ts-ignore
        return formatResult(labs, 2);
    }

    async findLabsByIds(labsIds: string[]): Promise<any[]> {
    const labs = await this.labRepository.find({
      where: { id: In(labsIds) },
      relations: ['children', 'bodySystem', 'parent'],
    });

    if (!labs || labs.length === 0) {
      throw new NotFoundException('Labs not found');
    }
    
    return formatResult(labs);
  }

    async create(createDto: LabDto): Promise<Lab> {
        const { name, nameKey, bodySystemId, parentId } = createDto;

        const bodySystem = await this.bodySystemRepository.findOne({ where: { id: bodySystemId } });
        if (!bodySystem) {
            throw new NotFoundException(`BodySystem with id ${bodySystemId} not found`);
        }

        const lab = new Lab();
        lab.name = name;
        lab.nameKey = nameKey;
        lab.bodySystem = bodySystem;

        if (parentId) {
            const parentLab = await this.labRepository.findOne({ where: { id: parentId } });
            if (!parentLab) {
                throw new NotFoundException(`Parent Lab with id ${parentId} not found`);
            }
            lab.parent = parentLab;
            lab.level = parentLab.level + 1;
            if (lab.level > 2){
              throw new NotFoundException(`Max level is 3: bodySystem => parent => child`);
            }
        }

        return this.labRepository.save(lab);
    }

    async delete(labId: string): Promise<void> {
      const lab = await this.labRepository.findOne({ where: { id: labId } });
      if (!lab) {
        throw new NotFoundException(`Lab with id ${labId} not found`);
      }
      await this.labRepository.remove(lab);
    }
}

function formatResult(labs: Lab[], levelLimit?: number): any[] {
  return labs.reduce((acc, lab) => {
      if (levelLimit && lab.level < levelLimit) {
          acc.push({
              parentId: lab.parent ? lab.parent.id : null,
              id: lab.id,
              name: lab.name,
              nameKey: lab.nameKey,
              level: lab.level,
              bodySystemId: lab.bodySystem.id,
              children: lab.children,
          });
      }else{
            acc.push({
              parentId: lab.parent ? lab.parent.id : null,
              id: lab.id,
              name: lab.name,
              nameKey: lab.nameKey,
              level: lab.level,
              bodySystemId: lab.bodySystem.id,
              children: lab.children,
          });
      }
      return acc;
}, []);
}

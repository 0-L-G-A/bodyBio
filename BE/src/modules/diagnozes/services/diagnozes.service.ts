import { BodySystem } from "@app/entities/BodySystem";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { DiagnozeDto } from "../dtos/diagnozes.dto";
import { Finding } from "@app/entities/Finding";
import { Diagnoze } from "@app/entities/Diagnoze";

@Injectable()
export class DiagnozesService {
    constructor(
        @InjectRepository(Diagnoze)
        private readonly diagnozesRepository: Repository<Diagnoze>,

        @InjectRepository(BodySystem)
        private readonly bodySystemRepository: Repository<BodySystem>, // Репозиторій для BodySystem
    ) {}

    async findAll(): Promise<Diagnoze[]> {
        const items = await this.diagnozesRepository.find({ relations: ['bodySystem', 'children', 'parent'] });
        return formatResult(items, 2);
    }

    async findItemsByIds(itemsIds: string[]): Promise<Diagnoze[]> {
    const items = await this.diagnozesRepository.find({
      where: { id: In(itemsIds) },
      relations: ['children', 'bodySystem', 'parent'],
    });

    if (!items || items.length === 0) {
      throw new NotFoundException('Items not found');
    }

    return formatResult(items);
  }

    async create(createDto: DiagnozeDto): Promise<Diagnoze> {
        const { name, nameKey, bodySystemId, parentId } = createDto;

        const bodySystem = await this.bodySystemRepository.findOne({ where: { id: bodySystemId } });
        if (!bodySystem) {
            throw new NotFoundException(`BodySystem with id ${bodySystemId} not found`);
        }

        const newItem = new Finding();
        newItem.name = name;
        newItem.nameKey = nameKey;
        newItem.bodySystem = bodySystem;

        if (parentId) {
            const parentItem = await this.diagnozesRepository.findOne({ where: { id: parentId } });
            if (!parentItem) {
                throw new NotFoundException(`Parent item with id ${parentId} not found`);
            }
            newItem.parent = parentItem;
            newItem.level = parentItem.level + 1;
            if (newItem.level > 2){
              throw new NotFoundException(`Max level is 3: bodySystem => parent => child`);
            }
        }

        return this.diagnozesRepository.save(newItem);
    }

    async delete(itemId: string): Promise<void> {
      const item = await this.diagnozesRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new NotFoundException(`Item with id ${itemId} not found`);
      }
      await this.diagnozesRepository.remove(item);
    }
}

function formatResult(items: Finding[], levelLimit?: number): any[] {
  return items.reduce((acc, item) => {
      if (levelLimit && item.level < levelLimit) {
          acc.push({
              parentId: item.parent ? item.parent.id : null,
              id: item.id,
              name: item.name,
              nameKey: item.nameKey,
              level: item.level,
              bodySystemId: item.bodySystem.id,
              children: item.children,
          });
      }else{
            acc.push({
              parentId: item.parent ? item.parent.id : null,
              id: item.id,
              name: item.name,
              nameKey: item.nameKey,
              level: item.level,
              bodySystemId: item.bodySystem.id,
              children: item.children,
          });
      }
      return acc;
}, []);
}

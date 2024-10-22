import { BodySystem } from "@app/entities/BodySystem";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { FindingDto } from "../dtos/findings.dto";
import { Finding } from "@app/entities/Finding";

@Injectable()
export class FindingsService {
    constructor(
        @InjectRepository(Finding)
        private readonly findingsRepository: Repository<Finding>,

        @InjectRepository(BodySystem)
        private readonly bodySystemRepository: Repository<BodySystem>,
    ) {}

    async findAll(): Promise<Finding[]> {
        const items = await this.findingsRepository.find({ relations: ['bodySystem', 'children', 'parent'] });
        return formatResult(items, 2);
    }

    async findItemsByIds(itemsIds: string[]): Promise<any[]> {
    const items = await this.findingsRepository.find({
      where: { id: In(itemsIds) },
      relations: ['children', 'bodySystem', 'parent'],
    });

    if (!items || items.length === 0) {
      throw new NotFoundException('Items not found');
    }

    return formatResult(items);
  }

    async create(createDto: FindingDto): Promise<Finding> {
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
            const parentItem = await this.findingsRepository.findOne({ where: { id: parentId } });
            if (!parentItem) {
                throw new NotFoundException(`Parent item with id ${parentId} not found`);
            }
            newItem.parent = parentItem;
            newItem.level = parentItem.level + 1;
            if (newItem.level > 2){
              throw new NotFoundException(`Max level is 3: bodySystem => parent => child`);
            }
        }

        return this.findingsRepository.save(newItem);
    }

    async delete(itemId: string): Promise<void> {
      const item = await this.findingsRepository.findOne({ where: { id: itemId } });
      if (!item) {
        throw new NotFoundException(`Item with id ${itemId} not found`);
      }
      await this.findingsRepository.remove(item);
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

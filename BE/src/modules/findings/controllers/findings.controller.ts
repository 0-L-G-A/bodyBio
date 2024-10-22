import { Body, Controller, Delete, Get, Param, Post, } from '@nestjs/common';
import { FindingsService } from '../services/findings.service';
import { Finding } from '@app/entities/Finding';
import { FindingDto } from '../dtos/findings.dto';

@Controller('findings')
export class FindingsController {
    constructor(private readonly findingsService: FindingsService) {}

    @Get()
    findAll(): Promise<Finding[]> {
        return this.findingsService.findAll();
    }

    // @Get('by-ids')
    // async findFondingsByIds(@Query('findingsIds') findingsIds: string) {
    //     const idArray = JSON.parse(findingsIds); // Перетворюємо JSON-рядок у масив
    //     return this.findingsService.findFindingsByIds(idArray);
    // }

    @Post('by-ids')
    async findFindingsByIds(@Body('itemsIds') itemsIds: string[]) {
        return this.findingsService.findItemsByIds(itemsIds);
    }

    @Post()
    create(@Body() createDto: FindingDto): Promise<Finding> {
        return this.findingsService.create(createDto);
    }

    @Delete(':id')
    async deleteFinding(@Param('id') findingId: string): Promise<void> {
      await this.findingsService.delete(findingId);
    }
}

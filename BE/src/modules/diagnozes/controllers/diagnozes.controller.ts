import { Body, Controller, Delete, Get, Param, Post, } from '@nestjs/common';
import { DiagnozesService } from '../services/diagnozes.service';
import { Finding } from '@app/entities/Finding';
import { DiagnozeDto } from '../dtos/diagnozes.dto';
import { Diagnoze } from '@app/entities/Diagnoze';

@Controller('diagnozes')
export class DiagnozesController {
    constructor(private readonly diagnozesService: DiagnozesService) {}

    @Get()
    findAll(): Promise<Finding[]> {
        return this.diagnozesService.findAll();
    }

    // @Get('by-ids')
    // async findFondingsByIds(@Query('findingsIds') findingsIds: string) {
    //     const idArray = JSON.parse(findingsIds); // Перетворюємо JSON-рядок у масив
    //     return this.diagnozesService.findFindingsByIds(idArray);
    // }

    @Post('by-ids')
    async findDiagnozesByIds(@Body('itemsIds') itemsIds: string[]) {
        return this.diagnozesService.findItemsByIds(itemsIds);
    }

    @Post()
    create(@Body() createDto: DiagnozeDto): Promise<Diagnoze> {
        return this.diagnozesService.create(createDto);
    }

    @Delete(':id')  // Додаємо маршрут для видалення
    async deleteFinding(@Param('id') findingId: string): Promise<void> {
      await this.diagnozesService.delete(findingId);
    }
}

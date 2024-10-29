import { Body, Controller, Delete, Get, Param, Post, } from '@nestjs/common';
import { LabsService } from '../services/labs.service';
import { Lab } from '@app/entities/Lab';
import { LabDto } from '../dtos/labs.dto';

@Controller('labs')
export class LabsController {
    constructor(private readonly labsService: LabsService) {}

    @Get()
    findAll(): Promise<Lab[]> {
        return this.labsService.findAll();
    }

    // @Get('by-ids')
    // async findLabsByIds(@Query('labsIds') labsIds: string) {
    //     const idArray = JSON.parse(labsIds); // Перетворюємо JSON-рядок у масив
    //     return this.labsService.findLabsByIds(idArray);
    // }

    @Post('by-ids')
    async findLabsByIds(@Body('labsIds') labsIds: string[]) {
        return this.labsService.findLabsByIds(labsIds);
    }

    @Post()
    create(@Body() createDto: LabDto): Promise<Lab> {
        return this.labsService.create(createDto);
    }

    @Delete(':id')
    async deleteLab(@Param('id') labId: string): Promise<void> {
      await this.labsService.delete(labId);
    }
}

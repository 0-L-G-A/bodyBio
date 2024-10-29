import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BodySystemsService } from "../services/bodySystems.service";
import { BodySystem } from "@app/entities/BodySystem";
import { BodySystemDto } from "../dtos/bodySystems.dto";

@Controller('body-systems')
export class BodySystemsController {
    constructor(private bodySystemsService: BodySystemsService) {}

    @Get()
    findAll(): Promise<BodySystem[]> {
        return this.bodySystemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<BodySystem | null> {
        return this.bodySystemsService.findOne(id);
    }

    @Post()
    create(@Body() createDto: BodySystemDto): Promise<BodySystem> {
        return this.bodySystemsService.create(createDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: BodySystemDto): Promise<BodySystem> {
        return this.bodySystemsService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.bodySystemsService.delete(id);
    }
}

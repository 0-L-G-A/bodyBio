import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
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

    @Post()
    create(@Body() createDto: BodySystemDto): Promise<BodySystem> {
        return this.bodySystemsService.create(createDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: BodySystemDto): Promise<BodySystem> {
        return this.bodySystemsService.update(id, updateDto);
    }
}

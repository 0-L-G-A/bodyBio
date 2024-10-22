import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersDiagnozesService } from "../services/userDiagnozes.service";
import { CreateUsersDiagnozesDto } from "../dtos/userDiagnozes.dto";
import { UsersDiagnozes } from "@app/entities/UsersDiagnozes";

@Controller('users-diagnozes')
export class UsersDiagnozesController {
  constructor(private readonly usersDiagnozesService: UsersDiagnozesService) {}

  @Post()
  async create(@Body() createDto: CreateUsersDiagnozesDto): Promise<UsersDiagnozes> {
    return this.usersDiagnozesService.create(createDto);
  }

  @Get()
  async findAllByUserIdAndBodySystem(
    @Query('userId') userId: string,
    @Query('bodySystemId') bodySystemId?: string,
  ): Promise<UsersDiagnozes[]> {
    return this.usersDiagnozesService.findAllByUserIdAndBodySystem(userId, bodySystemId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UsersDiagnozes | null> {
    return this.usersDiagnozesService.findOne(id);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() updateDto: Partial<CreateUsersDiagnozesDto>): Promise<UsersDiagnozes> {
    return this.usersDiagnozesService.edit(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersDiagnozesService.delete(id);
  }
}
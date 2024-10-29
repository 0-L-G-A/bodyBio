import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersFindingsService } from "../services/userFindings.service";
import { CreateUsersFindingsDto } from "../dtos/userFindings.dto";
import { UsersFinding } from "@app/entities/UsersFindings";

@Controller('users-findings')
export class UsersFindingsController {
  constructor(private readonly usersFindingsService: UsersFindingsService) {}

  @Post()
  async create(@Body() createDto: CreateUsersFindingsDto): Promise<UsersFinding> {
    return this.usersFindingsService.create(createDto);
  }

  @Get()
  async findAllByUserIdAndBodySystem(
    @Query('userId') userId: string,
    @Query('bodySystemId') bodySystemId?: string,
  ): Promise<UsersFinding[]> {
    return this.usersFindingsService.findAllByUserIdAndBodySystem(userId, bodySystemId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UsersFinding | null> {
    return this.usersFindingsService.findOne(id);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() updateDto: Partial<CreateUsersFindingsDto>): Promise<UsersFinding> {
    return this.usersFindingsService.edit(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersFindingsService.delete(id);
  }
}
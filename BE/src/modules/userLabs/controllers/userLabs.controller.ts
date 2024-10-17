import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersLabsService } from "../services/userLabs.service";
import { CreateUsersLabsDto } from "../dtos/userLabs.dto";
import { UsersLabs } from "@app/entities/UsersLabs";

@Controller('users-labs')
export class UsersLabsController {
  constructor(private readonly usersLabsService: UsersLabsService) {}

  // Create a new UsersLabs record
  @Post()
  async create(@Body() createDto: CreateUsersLabsDto): Promise<UsersLabs> {
    return this.usersLabsService.create(createDto);
  }

  @Get()
  async findAllByUserIdAndBodySystem(
    @Query('userId') userId: string,
    @Query('bodySystemId') bodySystemId?: string,
  ): Promise<UsersLabs[]> {
    return this.usersLabsService.findAllByUserIdAndBodySystem(userId, bodySystemId);
  }

  // Get a single UsersLabs record by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UsersLabs | null> {
    return this.usersLabsService.findOne(id);
  }

  // Edit an existing UsersLabs record
  @Patch(':id')
  async edit(@Param('id') id: string, @Body() updateDto: Partial<CreateUsersLabsDto>): Promise<UsersLabs> {
    return this.usersLabsService.edit(id, updateDto);
  }

  // Delete a UsersLabs record
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersLabsService.delete(id);
  }
}
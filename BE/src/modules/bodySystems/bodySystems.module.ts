import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodySystemsController } from './controllers/bodySystems.controller';
import { BodySystemsService } from './services/bodySystems.service';
import { BodySystem } from '@app/entities/BodySystem';



@Module({
  imports: [TypeOrmModule.forFeature([BodySystem])],
  controllers: [BodySystemsController],
  providers: [BodySystemsService],
  exports: [TypeOrmModule]
})
export class BodySystemsModule {}
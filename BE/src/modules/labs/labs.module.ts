import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from '@app/entities/Lab';
import { LabsService } from './services/labs.service';
import { LabsController } from './controllers/labs.controller';
import { BodySystemsModule } from '../bodySystems/bodySystems.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([Lab]),
    BodySystemsModule,           
  ],
  controllers: [LabsController],
  providers: [LabsService]
})
export class LabsModule {}

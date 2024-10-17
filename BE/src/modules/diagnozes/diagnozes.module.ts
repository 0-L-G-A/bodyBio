import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodySystemsModule } from '../bodySystems/bodySystems.module';
import { DiagnozesController } from './controllers/diagnozes.controller';
import { DiagnozesService } from './services/diagnozes.service';
import { Diagnoze } from '@app/entities/Diagnoze';



@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnoze]),
    BodySystemsModule,
  ],
  controllers: [DiagnozesController],
  providers: [DiagnozesService]
})
export class DiagnozeModule {}

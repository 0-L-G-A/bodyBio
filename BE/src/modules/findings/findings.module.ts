import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodySystemsModule } from '../bodySystems/bodySystems.module';
import { FindingsController } from './controllers/findings.controller';
import { FindingsService } from './services/findings.service';
import { Finding } from '@app/entities/Finding';



@Module({
  imports: [
    TypeOrmModule.forFeature([Finding]),
    BodySystemsModule,
  ],
  controllers: [FindingsController],
  providers: [FindingsService]
})
export class FindingsModule {}

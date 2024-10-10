import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UsersModule } from './modules/users/users.module';
import { DoctorSpecialization } from './entities/DoctorSpecialization';
import { DoctorSpecsModule } from './modules/doctorsSpecializations/doctorsSpecializations.module';
import { BodySystem } from './entities/BodySystem';
import { Laboratory } from './entities/Laboratory';
import { Diagnoze } from './entities/Diagnoze';
import { Finding } from './entities/Finding';
import { BodySystemsModule } from './modules/bodySystems/bodySystems.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root12T$',
    database: 'body_bio',
    entities: [
      User,
      DoctorSpecialization,
      BodySystem,
      Laboratory,
      Diagnoze,
      Finding
    ],
    synchronize: true,
    // logging: true,
    }), 
    UsersModule,
    DoctorSpecsModule,
    BodySystemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UsersModule } from './modules/users/users.module';
import { DoctorSpecialization } from './entities/DoctorSpecialization';
import { DoctorSpecsModule } from './modules/doctorsSpecializations/doctorsSpecializations.module';
import { BodySystem } from './entities/BodySystem';
import { Lab } from './entities/Lab';
import { Diagnoze } from './entities/Diagnoze';
import { Finding } from './entities/Finding';
import { BodySystemsModule } from './modules/bodySystems/bodySystems.module';
import { LabsModule } from './modules/labs/labs.module';
import { FindingsModule } from './modules/findings/findings.module';
import { DiagnozeModule } from './modules/diagnozes/diagnozes.module';
import { UsersAppointmentModule } from './modules/appointment/apointment.module';
import { Appointment } from './entities/UsersAppointment';
import { UsersDiagnozes } from './entities/UsersDiagnozes';
import { UsersLabs } from './entities/UsersLabs';
import { UsersFinding } from './entities/UsersFindings';
import { UsersLabsModule } from './modules/userLabs/userLabs.module';

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
      Lab,
      Diagnoze,
      Finding,
      UsersDiagnozes,
      UsersFinding,
      UsersLabs,
      Appointment
    ],
    synchronize: true,
    // logging: true,
    }), 
    UsersModule,
    DoctorSpecsModule,
    BodySystemsModule,
    LabsModule,
    FindingsModule,
    DiagnozeModule,
    UsersAppointmentModule,
    UsersLabsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

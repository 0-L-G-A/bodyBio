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
import { UsersFindingsModule } from './modules/userFindings/userFindings.module';
import { UsersDiagnozesModule } from './modules/userDiagnozes/userDiagnozes.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './modules/users/controllers/users.controller';
import { UsersLabsController } from './modules/userLabs/controllers/userLabs.controller';
import { UsersFindingsController } from './modules/userFindings/controllers/userFindings.controller';
import { UsersDiagnozesController } from './modules/userDiagnozes/controllers/userDiagnozes.controller';
import { LabsController } from './modules/labs/controllers/labs.controller';
import { FindingsController } from './modules/findings/controllers/findings.controller';
import { DoctorsSpecsController } from './modules/doctorsSpecializations/controllers/doctorsSpecializations.controller';
import { DiagnozesController } from './modules/diagnozes/controllers/diagnozes.controller';
import { BodySystemsController } from './modules/bodySystems/controllers/bodySystems.controller';
import { UsersAppointmentsController } from './modules/appointment/controllers/apointment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3006,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
        Appointment,
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
    UsersLabsModule,
    UsersFindingsModule,
    UsersDiagnozesModule,
  ],
  controllers: [
    AppController,
    UsersController,
    UsersLabsController,
    UsersFindingsController,
    UsersDiagnozesController,
    LabsController,
    FindingsController,
    DoctorsSpecsController,
    DiagnozesController,
    BodySystemsController,
    UsersAppointmentsController,
  ],
  providers: [AppService],
})
export class AppModule {}

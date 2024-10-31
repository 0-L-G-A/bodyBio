import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3006',
      'http://localhost:3306',
      'https://bodybio.netlify.app/',
      'https://bodybio.netlify.app',
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
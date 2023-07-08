import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { config } from 'dotenv';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { Session } from './typeorm/entities/Session';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(Session);

  app.setGlobalPrefix('/api');
  app.use(session({
    name: "NESTJS_SESSION_ID",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: new TypeormStore({
      limitSubquery: false
    }).connect(sessionRepository),

  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();

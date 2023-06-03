import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PrismaService from './database/prisma.service';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { MovieRepository } from './movie/repository/movie.repository';

@Module({
  imports: [],
  controllers: [AppController, MovieController],
  providers: [AppService, PrismaService, MovieService, MovieRepository],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import PrismaService from 'src/database/prisma.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieRepository } from './repository/movie.repository';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, PrismaService],
})
export class MovieModule {}

import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import PrismaService from 'src/database/prisma.service';

@Injectable()
export class MovieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  listMovies(
    take?: number,
    skip?: number,
    where?: Prisma.MovieWhereInput,
  ): Promise<Movie[]> {
    return this.prismaService.movie.findMany({ take, skip, where });
  }

  countMovies(where?: Prisma.MovieWhereInput): Promise<number> {
    return this.prismaService.movie.count({ where });
  }
}

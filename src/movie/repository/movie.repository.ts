import { Injectable } from '@nestjs/common';
import PrismaService from 'src/database/prisma.service';

@Injectable()
export class MovieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  listPaginatedMovie() {
    return this.prismaService.movie.findMany({ take: 10 });
  }
}

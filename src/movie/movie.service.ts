import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import PaginationModel from 'src/utils/models/pagination.model';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async listPaginatedMovies(query: {
    pageSize: number;
    page: number;
  }): Promise<PaginationModel<Movie>> {
    const total = await this.movieRepository.countMovies();

    const pages = Math.ceil(total / query.pageSize);

    if (pages < query.page)
      throw new HttpException(
        { message: `Page number is greater than total pages` },
        HttpStatus.BAD_REQUEST,
      );

    const movies = await this.movieRepository.listMovies(
      query.pageSize,
      query.pageSize * (query.page - 1),
    );

    return new PaginationModel<Movie>(total, pages, movies);
  }
}

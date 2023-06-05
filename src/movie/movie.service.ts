import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async listPaginatedMovies(query: { pageSize: number; page: number }) {
    console.log('query', query);
    const total = await this.movieRepository.countMovies();

    const totalPages = Math.ceil(total / query.pageSize);

    if (totalPages < query.page)
      throw new HttpException(
        { message: `Page number is greater than total pages` },
        HttpStatus.BAD_REQUEST,
      );

    return this.movieRepository.listMovies(
      query.pageSize,
      query.pageSize * (query.page - 1),
    );
  }
}

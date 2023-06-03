import { Injectable } from '@nestjs/common';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  listPaginatedMovie() {
    return this.movieRepository.listPaginatedMovie();
  }
}

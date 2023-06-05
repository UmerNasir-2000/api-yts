import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  fetchPaginatedMovies() {
    return this.movieService.listPaginatedMovies({ page: 2, pageSize: 20 });
  }
}

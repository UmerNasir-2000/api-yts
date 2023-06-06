import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import MaxNumberPipe from 'src/pipes/max.pipe';
import MinNumberPipe from 'src/pipes/min.pipe';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('trending')
  fetchTrendingPaginatedMovies(
    @Query('page', new DefaultValuePipe(0), new MinNumberPipe(1), ParseIntPipe)
    page: number,
    @Query(
      'offset',
      new DefaultValuePipe(0),
      new MaxNumberPipe(50),
      ParseIntPipe,
    )
    offset: number,
  ) {
    return this.movieService.listTrendingMoviesPaginated({ page, offset });
  }

  @Get('latest')
  fetchLatestPaginatedMovies(
    @Query('page', new DefaultValuePipe(0), new MinNumberPipe(1), ParseIntPipe)
    page: number,
    @Query(
      'offset',
      new DefaultValuePipe(0),
      new MaxNumberPipe(50),
      ParseIntPipe,
    )
    offset: number,
  ) {
    return this.movieService.listLatestMoviesPaginated({ page, offset });
  }
}

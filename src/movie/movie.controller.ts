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

  @Get()
  fetchPaginatedMovies(
    @Query('page', new DefaultValuePipe(0), new MinNumberPipe(1), ParseIntPipe)
    page: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(0),
      new MaxNumberPipe(50),
      ParseIntPipe,
    )
    pageSize: number,
  ) {
    return this.movieService.listPaginatedMovies({ page, pageSize });
  }
}

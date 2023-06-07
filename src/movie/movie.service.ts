import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import PaginationModel from 'src/utils/models/pagination.model';
import MovieFilters from './dto/movie.filters.params';
import PaginationModelFactory from './factory/pagination.factory';
import Pagination from './pagination';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  listMoviesByFiltersPaginated(query: {
    page: number;
    offset: number;
    filters: MovieFilters;
  }) {
    const { page, offset, filters } = query;

    const whereCriteria: Prisma.MovieWhereInput = {
      rating: {
        gte: filters?.rating ? Number(filters?.rating) : filters?.rating,
      },
      title: { contains: filters?.search },
      language: { equals: filters?.language },
      genres: { array_contains: filters?.genre },
      torrents: { some: { quality: filters?.quality } },
      year: { equals: filters?.year ? Number(filters?.year) : filters?.year },
    };

    return this.listPaginatedMovies(page, offset, whereCriteria);
  }

  // REFACTOR: Query parameters

  listMoviesByResolutionPaginated(query: { page: number; offset: number }) {
    const { page, offset } = query;

    const whereCriteria: Prisma.MovieWhereInput = {
      torrents: { some: { quality: '3D' } },
    };

    return this.listPaginatedMovies(page, offset, whereCriteria);
  }

  listTrendingMoviesPaginated(query: { page: number; offset: number }) {
    const { page, offset } = query;

    const whereCriteria: Prisma.MovieWhereInput = { rating: { gt: 8 } };

    return this.listPaginatedMovies(page, offset, whereCriteria);
  }

  listLatestMoviesPaginated(query: { page: number; offset: number }) {
    const { page, offset } = query;

    const whereCriteria: Prisma.MovieWhereInput = {
      year: { in: [2023, 2022] },
    };

    return this.listPaginatedMovies(page, offset, whereCriteria);
  }

  private async listPaginatedMovies(
    page: number,
    offset: number,
    whereCriteria?: Prisma.MovieWhereInput,
  ): Promise<PaginationModel<Movie>> {
    const total = await this.movieRepository.countMovies(whereCriteria);

    const pages = Pagination.getTotalPages(total, offset);

    Pagination.isValidPage(page, pages);

    const movies = await this.movieRepository.listMovies(
      offset,
      Pagination.getSkippedRecordsCount(page, offset),
      whereCriteria,
    );

    return PaginationModelFactory.create<Movie>(total, pages, movies);
  }
}

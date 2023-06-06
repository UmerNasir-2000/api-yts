import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import PaginationModel from 'src/utils/models/pagination.model';
import PaginationModelFactory from './factory/pagination.factory';
import Pagination from './pagination';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

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
    includeCriteria?: Prisma.MovieInclude,
  ): Promise<PaginationModel<Movie>> {
    const total = await this.movieRepository.countMovies(whereCriteria);

    const pages = Pagination.getTotalPages(total, offset);

    Pagination.isValidPage(page, pages);

    const movies = await this.movieRepository.listMovies(
      offset,
      Pagination.getSkippedRecordsCount(page, offset),
      whereCriteria,
      includeCriteria,
    );

    return PaginationModelFactory.create<Movie>(total, pages, movies);
  }
}

/* REVIEW:
Based on the provided code snippet, here's a review of its adherence to design patterns and SOLID principles:

Design Patterns:
1. Factory Pattern: There is no explicit usage of a factory pattern in the code snippet.

SOLID Principles:
1. Single Responsibility Principle (SRP): The `listPaginatedMovies` method appears to have a single responsibility, which is to retrieve a paginated list of movies. It calculates the total number of movies, checks if the requested page is valid, retrieves the movies from the repository, and constructs a `PaginationModel`. However, it could be argued that the error handling code violates the SRP as it is responsible for both checking the page validity and throwing an exception. It would be better to extract the page validity check into a separate method or class.

2. Open/Closed Principle (OCP): The code snippet doesn't violate the OCP as there are no explicit extension points that could be modified or extended. However, it could be improved by introducing an abstraction for the `movieRepository` dependency, which would allow different implementations to be used without modifying this code.

3. Liskov Substitution Principle (LSP): The code snippet doesn't involve any inheritance or polymorphism, so the LSP is not directly applicable here.

4. Interface Segregation Principle (ISP): The code snippet doesn't define any interfaces, so the ISP is not directly applicable here.

5. Dependency Inversion Principle (DIP): The code snippet does not fully adhere to the DIP. It directly depends on the concrete `movieRepository` implementation. To follow the DIP, it would be better to introduce an interface or an abstraction for the repository and inject it into the class that contains this method. This would allow different implementations to be easily substituted.

Overall, the code snippet could benefit from a more structured approach and better adherence to SOLID principles. */

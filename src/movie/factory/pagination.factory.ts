import PaginationModel from 'src/utils/models/pagination.model';

export default class PaginationModelFactory {
  static create<T>(
    count: number,
    pages: number,
    items: T[],
  ): PaginationModel<T> {
    return new PaginationModel(count, pages, items);
  }
}

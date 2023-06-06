export default class Pagination {
  static isValidPage(page: number, total: number): boolean {
    if (total < page) throw new Error(`Invalid page`);
    return true;
  }

  static getTotalPages(records: number, offset: number): number {
    return Math.ceil(records / offset);
  }

  static getSkippedRecordsCount(page: number, offset: number): number {
    return offset * (page - 1);
  }
}

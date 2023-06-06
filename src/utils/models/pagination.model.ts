export default class PaginationModel<T> {
  constructor(
    public count: number,
    public pages: number,
    public items: Array<T>,
  ) {
    this.count = count;
    this.pages = pages;
    this.items = items;
  }
}

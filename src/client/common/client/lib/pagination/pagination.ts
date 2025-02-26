import { Store } from '../store/store';
import { IPaginationState } from './pagination.types';
import { PAGINATION_INITIAL_STATE } from './pagination.constants';

export class Pagination extends Store<IPaginationState> {
  constructor(public Error: Store['Error']) {
    super(PAGINATION_INITIAL_STATE, Error);
    this.setTotal = this.setTotal.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.toFirstPage = this.toFirstPage.bind(this);
    this.toLastPage = this.toLastPage.bind(this);
  }

  setState(state: Partial<IPaginationState>) {
    Object.assign(this.$state, state);
    const params = {} as IPaginationState;
    params.page = this.getPage();
    params.pageCount = this.getPageCount();
    params.range = this.getRange();
    params.isFirstPage = this.isFirstPage();
    params.isLastPage = this.isLastPage();
    super.setState(params);
  }

  setTotal(total: number) {
    const { offset, limit } = this.$state;
    if (!total) {
      this.setState({ total: 0, offset: 0 });
    } else if (offset >= total) {
      const newOffset = Math.ceil(total / limit) * limit - limit;
      this.setState({ total, offset: newOffset });
    } else {
      this.setState({ total });
    }
  }

  setLimit(limit: number) {
    const { offset, total } = this.$state;
    let newOffset = offset - (offset % limit);
    if (offset > total) {
      newOffset = Math.ceil(total / limit) * limit - limit;
    }
    this.setState({ offset: newOffset, limit });
  }

  nextPage() {
    const { offset, limit, isLastPage } = this.$state;
    if (isLastPage) {
      return;
    }
    this.setState({ offset: offset + limit });
  }

  prevPage() {
    const { offset, limit, isFirstPage } = this.$state;
    if (isFirstPage) {
      return;
    }
    this.setState({ offset: offset - limit });
  }

  toFirstPage() {
    if (this.isFirstPage()) {
      return;
    }
    this.setState({ offset: 0 });
  }

  toLastPage() {
    const { limit, pageCount, isLastPage } = this.$state;
    if (isLastPage) {
      return;
    }
    const offset = (pageCount - 1) * limit;
    this.setState({ offset });
  }

  private getPage() {
    const { offset, limit, total } = this.$state;
    return total && offset / limit + 1;
  }

  private getPageCount() {
    const { limit, total } = this.$state;
    return Math.ceil(total / limit);
  }

  private getRange() {
    const { offset, limit, total } = this.$state;
    const from = offset;
    const to = this.isLastPage() ? total : offset + limit;
    return { from, to };
  }

  private isFirstPage() {
    return this.getPage() <= 1;
  }

  private isLastPage() {
    return this.getPage() >= this.getPageCount();
  }
}

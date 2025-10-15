export interface ISearchQuery {
  postalCode: string;
  postalCodeRadius: number;
  pageIndex: number;
  terms: string;
}

export interface ISearchResult {
  id: number;
  name: string;
  city: string;
}

export const getDefaultSearchQuery = (): ISearchQuery => ({
  postalCode: '',
  postalCodeRadius: 0,
  pageIndex: 0,
  terms: '',
}) 
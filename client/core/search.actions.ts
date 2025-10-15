import { ISearchQuery } from "./search.models";
import { createAction } from '@ngrx/store'

export const setSearchQuery = createAction(
  "Create Search Query",
  props<{ query: Partial<ISearchQuery> }>()
);

export const searchIncrementPage = createAction("Increment Page");

export const setSearchResults = createAction(
  "Set Search Results",
  props<{ query: ISearchQuery; results: {ids: string[]; hasMore: boolean} }>()
);

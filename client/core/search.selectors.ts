import { ISearchQuery } from "./search.models";
import { getSearchQueryHash } from "./search.utils";

const selectSearchState = createFeatureSelector<IState>('searchState')

export const selectCurrentSearchQuery = createSelector(
    selectSearchState,
  (state): ISearchQuery => state.currentQuery
)

export const selectCurrentSearchPage = createSelector(
  selectCurrentSearchQuery,
  (query) => query.pageIndex
);

export const selectAllSearchResults = createSelector(
  selectSearchState, (state) => state.charityResults
)

export const selectCurrentQuerySearchResult = createSelector(
  selectCurrentSearchQuery,
  selectAllSearchResults,
  (currentQuery, allResults): ISearchResult => allResults[getSearchQueryHash(currentQuery)]
)
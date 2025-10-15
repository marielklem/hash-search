import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators'
import { searchIncrementPage, setSearchQuery, setSearchResults } from './search.actions';
import { selectCurrentQuerySearchResult, selectCurrentSearchPage, selectCurrentSearchQuery } from './search.selectors';
import { getSearchQueryHash } from './search.utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpResponse } from '@angular/common/http'
import { ISearchQuery, ISearchResult } from './search.models';
import { Store } from '@ngrx/store';

export class SearchEffects {
  constructor(
    private actions$: Actions,
    private api: APIService,
    private store: Store,
  ) {}

  searchHash: string;
  SEARCH_PAGE_LIMIT = 9;

  incrementPageEffect = createEffect(() => 
    this.actions$.pipe(
      ofType(searchIncrementPage),
      withLatestFrom(
        this.store.select(selectCurrentSearchPage)
      ),
      map(([action, pageIndex]) => {
        const queryUpdate = { pageIndex: pageIndex + 1}
        return setSearchQuery({ query: queryUpdate })
      })
    )
  )

  setSearchQueryEffect = createEffect(() => 
      this.actions$.pipe(
      ofType(setSearchQuery),
      withLatestFrom(
        this.store.select(selectCurrentSearchQuery),
        this.store.select(selectCurrentQuerySearchResult)
      ),
      mergeMap(([action, query, results]) => {
        this.searchHash = `${getSearchQueryHash(query)}|${Date.now()}`;
        return this.getSearchResults$(query);
      }),
      switchMap(response => {
        if (isSuccessResponse(response)) {
          return setSearchResults({
            query: response.body?.data?.query,
            results: {
              ids: response.body.data.results.map((res: ISearchResult) => res.id.toString()),
              hasMore: response.body.data.hasMore,
            }
          })
        }
      })
    )
  )

  private getSearchResults$(query: ISearchQuery): Observable<HttpResponse<{hasMore: boolean; results: ISearchResult;  query: ISearchQuery}>> {
    return this.api.post({
      path: '/search',
      body: {
        terms: query.terms,
        pageIndex: query.pageIndex,
        pageSize: this.SEARCH_PAGE_LIMIT,
        zipCode: query.postalCode,
        radius: query.postalCodeRadius,
      }
    })
  }
}
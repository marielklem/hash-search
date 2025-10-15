import { Observable } from "rxjs";
import { ISearchQuery } from "./search.models";
import { selectCurrentSearchQuery } from "./search.selectors";

export class SearchService {
  currentSearchQuery$: Observable<ISearchQuery> = this.store.select(selectCurrentSearchQuery)
}
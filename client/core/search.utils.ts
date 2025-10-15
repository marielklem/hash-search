import { ISearchQuery, ISearchResult } from "./search.models";
import { MD5 } from 'crypto-es'

export const getSearchQueryHash = (query: ISearchQuery): string => MD5(JSON.stringify(query)).toString();

export const getSearchQueryFullResults = (
  currentQuery: ISearchQuery, 
  allResults: { [queryHash: string]: ISearchResult }, 
  entityMap: {[id: number]: ISearchResult}) => {
  let results = [];
  for (let i=0; i <= currentQuery.pageIndex; i++) {
    const pageResult = allResults.getSearchQueryHash({ ...currentQuery, pageIndex: i})
    if (pageResult && entityMap) {
      results = results.concat(pageResult.ids.map((id) => entityMap[id]))
    }
  }
}
export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export function changeSearchQuery(query) {
  return {
    type: CHANGE_SEARCH_QUERY,
    payload: query
  };
}

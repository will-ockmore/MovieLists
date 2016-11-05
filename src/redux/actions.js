export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export function changeSearchQuery(query) {
  return {
    type: CHANGE_SEARCH_QUERY,
    payload: query
  };
}

export const GET_API_CONFIG = 'GET_API_CONFIG';
export function getApiConfiguration() {
  return { type: GET_API_CONFIG };
}

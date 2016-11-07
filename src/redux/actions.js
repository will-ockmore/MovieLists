export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export function changeSearchQuery(query, noDelay) {
  return {
    type: CHANGE_SEARCH_QUERY,
    payload: { query, noDelay }
  };
}

export const GET_API_CONFIG = 'GET_API_CONFIG';
export function getApiConfiguration() {
  return { type: GET_API_CONFIG };
}

export const LOAD_MOVIE_DETAILS = 'LOAD_MOVIE_DETAILS';
export function loadMovieDetails(id) {
  return { type: LOAD_MOVIE_DETAILS, payload: { id } };
}

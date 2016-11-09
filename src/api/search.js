import { fromJS } from 'immutable';

import { BASE_URL, SEARCH, API_KEY } from '../settings';

// extra params as immutable map
export function _search(collection, params) {
  const transformedParams =
    params && params
      .map((val, key) => key + '=' + val)
      .join('&');
  const url = BASE_URL + collection + '?api_key=' + API_KEY + '&' + transformedParams;
  return fetch(url).then(res => res.json());
}

export function searchMovies(query, extraParams = {}) {
  return _search(SEARCH.MOVIES, fromJS(extraParams).merge({ query }));
}

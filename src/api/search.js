import { BASE_URL, SEARCH, API_KEY } from '../settings';

// extra params as immutable map
export function _search(collection, query, extraParams) {
  const params =
    extraParams && extraParams
      .map((val, key) => key + '=' + val)
      .join('&');
  const url = BASE_URL + collection + '?api_key=' + API_KEY + '&' + params + '&query=' + query;
  return fetch(url).then(res => res.json());
}

export function searchMovies(query, extraParams) {
  return _search(SEARCH.MOVIES, query, extraParams);
}

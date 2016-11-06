import { BASE_URL, MOVIE, API_KEY } from '../settings';

// extra params as immutable map
export function _getItem(collection, id, extraParams) {
  const params =
    extraParams && extraParams
      .map((val, key) => key + '=' + val)
      .join('&');
  const url = BASE_URL + collection + `/${id}?api_key=` + API_KEY + '&' + params;
  return fetch(url).then(res => res.json());
}

export function getMovie(id, extraParams) {
  return _getItem(MOVIE, id, extraParams);
}

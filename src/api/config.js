import { BASE_URL, CONFIGURATION, MOVIE_GENRES, API_KEY } from '../settings';

export function getConfig() {
  const url = BASE_URL + CONFIGURATION + '?api_key=' + API_KEY;
  return fetch(url).then(res => res.json());
}

export function getGenres() {
  const url = BASE_URL + MOVIE_GENRES + '?api_key=' + API_KEY;
  return fetch(url).then(res => res.json());
}

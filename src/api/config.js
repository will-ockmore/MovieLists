import { BASE_URL, CONFIGURATION, API_KEY } from '../settings';

export function getConfig() {
  const url = BASE_URL + CONFIGURATION + '?api_key=' + API_KEY;
  return fetch(url).then(res => res.json());
}


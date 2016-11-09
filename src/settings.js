export const BASE_URL = 'https://api.themoviedb.org/3';

// search collections
export const SEARCH = {
  MOVIES: '/search/movie',
  TV: '/search/tv',
  PEOPLE: '/search/person',
}

// items
export const MOVIE = '/movie';

export const CONFIGURATION = '/configuration';

export const GENRE = '/genre';
export const MOVIE_GENRES = GENRE + MOVIE + '/list';

export const API_KEY = '222b25964071b4f51f70335f0a47603d';
// export const API_KEY = process.env.REACT_APP_API_KEY;

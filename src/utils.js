import { fromJS, List, Map } from 'immutable';


export function filterIncompleteResults(results) {
  return fromJS(results)
      .filter(movie => movie.get('overview') && movie.get('backdrop_path'));
}

export function findGenreName(genreId, genres) {
  const obj = genres
    .find(genreObj => genreObj.get('id') === genreId, null, Map())
  const name = obj.get('name');
  return name;
}

export function getGenresAndDecades(results, genres) {
  const decades =
    results
      .map(movie => movie.get('release_date', '').slice(0, 3))
      .sort()
      .toOrderedSet();

  const resultGenres =
    results
      .map(movie => movie.get('genre_ids', List()))
      .flatten()
      .toOrderedSet()
      .map(genreId => findGenreName(genreId, genres))
      .sort();

  return { decades, resultGenres };
}

export function reduceSearchResults(_results, genres) {
  const results = filterIncompleteResults(_results);
  const { decades, resultGenres } = getGenresAndDecades(results, genres);

  return { results, decades, resultGenres };
}

export function isInGenre(movie, genreFilterValue, genres) {
  const movieGenres =
    movie
      .get('genre_ids', List())
      .map(genreId => findGenreName(genreId, genres))

  return genreFilterValue ? movieGenres.includes(genreFilterValue) : true;
}

export function isInDecade(movie, decadeFilterValue) {
  const releaseDecade = movie.get('release_date', false).slice(0, 3);
  return decadeFilterValue ? (releaseDecade === decadeFilterValue) : true;
}


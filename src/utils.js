import { fromJS, List, Map } from 'immutable';


export function filterIncompleteResults(results) {
  return fromJS(results)
      .filter(movie => movie.get('overview') && movie.get('backdrop_path'));
}

export function findGenreName(genreId, genres) {
  const obj =
    genres
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

export const isObject =
  maybeObject => maybeObject !== null && typeof maybeObject === 'object';

export function stringifyValues(object) {
  return Object
    .keys(object)
    .reduce((prev, current) => {
      if (isObject(object[current])) {
        prev[current] = stringifyValues(object[current]);
      } else {
        prev[current] = object[current] && object[current].toString();
      }
      return prev;
    }, {});
}

export function getArgs(sagaObject) {
  const args =
    Object
      .keys(sagaObject)
      .reduce((prev, current) => {
        if (current === 'args') {
          prev.concat(Object.values(sagaObject[current]));
        }
        return prev;
      }, []);

  const type =
    Object
      .keys(sagaObject)
      .reduce((prev, current) => {
        if (current.startsWith('@@redux-saga')) {
          return current;
        }
        return prev;
      }, '');

    return { type, args };
}


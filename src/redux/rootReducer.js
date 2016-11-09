import { fromJS, List, Map } from 'immutable';

import * as actions from './actions';
import * as sagaActions from './sagas';

const initialState = fromJS({
  query: '',
  filters: {decade: '', genre: ''},
  responses: {
    movies: {results: [], decades: [], resultGenres:[]},
    movieDetails: { status: '', result: { credits: {} }}
  },
  imageUrls: {smallBackdropUrl: '', largeBackdropUrl: ''},
  genres: []
});

export const responseStates = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_SEARCH_QUERY:
      return state.set('query', action.payload.query);

    case sagaActions.GET_MOVIES.SUCCESS:
      const results =
        fromJS(action.payload.results)
          .filter(movie => movie.get('overview') && movie.get('backdrop_path'));

      const decades =
        results
          .map(movie => movie.get('release_date', '').slice(0, 3))
          .sort()
          .toOrderedSet();

      const genres = state.get('genres', List());

      const resultGenres =
        results
          .map(movie => movie.get('genre_ids', List()))
          .flatten()
          .toOrderedSet()
          .map(genreId =>
            genres
              .find(genreObj => genreObj.get('id') === genreId, Map())
              .get('name')
          )
          .sort()

      return state
        .mergeIn(['responses', 'movies'], { results, decades, resultGenres });

    case sagaActions.GET_MOVIE_DETAILS.REQUEST:
      return state
        .setIn(['responses', 'movieDetails', 'status'], responseStates.PENDING);

    case sagaActions.GET_MOVIE_DETAILS.SUCCESS:
      return state
        .mergeIn(['responses', 'movieDetails'], { result: fromJS(action.payload), status: responseStates.SUCCESS });

    case actions.CHANGE_DECADE_FILTER:
      return state
        .setIn(['filters', 'decade'], action.payload.value);

    case actions.CHANGE_GENRE_FILTER:
      return state
        .setIn(['filters', 'genre'], action.payload.value);

    case sagaActions.GET_BACKDROP_URL.SUCCESS:
      const { secure_base_url, backdrop_sizes, profile_sizes } = action.payload;

      const smallBackdropUrl = secure_base_url + backdrop_sizes[0];
      const largeBackdropUrl = secure_base_url + backdrop_sizes[1];
      const smallProfileUrl = secure_base_url + profile_sizes[0];

      return state.mergeIn(['imageUrls'], {smallBackdropUrl, largeBackdropUrl, smallProfileUrl});

    case sagaActions.GET_GENRES.SUCCESS:
      return state.set('genres', fromJS(action.payload));

    default:
      return state;
  }
}

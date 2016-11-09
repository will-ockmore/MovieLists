import { fromJS } from 'immutable';

import { reduceSearchResults } from '../utils';
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
      return state
        .mergeIn(['responses', 'movies'], reduceSearchResults(action.payload, state.get('genres')));

    case sagaActions.GET_FURTHER_MOVIES.SUCCESS:
      const oldResults = state.getIn(['responses', 'movies', 'results']);
      const oldDecades = state.getIn(['responses', 'movies', 'decades']);
      const oldResultGenres = state.getIn(['responses', 'movies', 'resultGenres']);

      const  {
        results: newResults,
        decades: newDecades,
        resultGenres: newResultGenres
      } = reduceSearchResults(action.payload, state.get('genres'));

      const results = oldResults.concat(newResults);
      const decades = oldDecades.union(newDecades);
      const resultGenres = oldResultGenres.union(newResultGenres);

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

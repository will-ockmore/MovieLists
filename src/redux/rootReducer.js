import { fromJS } from 'immutable';

import * as actions from './actions';
import * as sagaActions from './sagas';

const initialState = fromJS({
  query: '',
  filters: {decade: {filterValue: ''}},
  responses: {
    movies: {results: [], groupedResults: {}},
    movieDetails: { status: '', result: { credits: {} }}
  },
  imageUrls: {smallBackdropUrl: '', largeBackdropUrl: ''}
})

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

      const groupedResults =
        results
          .groupBy(movie => movie.get('release_date', '').charAt(2));

      return state
        .mergeIn(['responses', 'movies'], {results, groupedResults});

    case sagaActions.GET_MOVIE_DETAILS.REQUEST:
      return state
        .setIn(['responses', 'movieDetails', 'status'], responseStates.PENDING);

    case sagaActions.GET_MOVIE_DETAILS.SUCCESS:
      return state
        .setIn(['responses', 'movieDetails', 'result'], fromJS(action.payload))
        .setIn(['responses', 'movieDetails', 'status'], responseStates.SUCCESS);

    case actions.CHANGE_DECADE_FILTER:
      return state
        .setIn(['filters', 'decade', 'filterValue'], action.payload.value);

    case sagaActions.GET_BACKDROP_URL.SUCCESS:
      const { secure_base_url, backdrop_sizes, profile_sizes } = action.payload;

      const smallBackdropUrl = secure_base_url + backdrop_sizes[0];
      const largeBackdropUrl = secure_base_url + backdrop_sizes[1];
      const smallProfileUrl = secure_base_url + profile_sizes[0];

      return state.mergeIn(['imageUrls'], {smallBackdropUrl, largeBackdropUrl, smallProfileUrl});
    default:
      return state;
  }
}

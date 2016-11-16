import * as actions from './actions';

describe('actions', () => {

  it('changeSearchQuery', () => {
    expect(
      actions.changeSearchQuery('blah', true)
    ).toEqual(
      {type: actions.CHANGE_SEARCH_QUERY, payload: { query: 'blah', noDelay: true }}
    );
  });

  it('getApiConfiguration', () => {
    expect(
      actions.getApiConfiguration()
    ).toEqual(
      {type: actions.GET_API_CONFIG}
    );
  });

  it('loadMovieDetails', () => {
    expect(
      actions.loadMovieDetails(123)
    ).toEqual(
      {type: actions.LOAD_MOVIE_DETAILS, payload: {id: 123}}
    );
  });

  it('changeDecadeFilter', () => {
    expect(
      actions.changeDecadeFilter(123)
    ).toEqual(
      {type: actions.CHANGE_DECADE_FILTER, payload: {value: 123}}
    );
  });

  it('changeGenreFilter', () => {
    expect(
      actions.changeGenreFilter(123)
    ).toEqual(
      {type: actions.CHANGE_GENRE_FILTER, payload: {value: 123}}
    );
  });

});

import React from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';

import { shallow } from 'enzyme';
import { ResultCard } from './ResultCard';

describe('ResultCard', () => {

  const MOVIE = Map({
    title: 'The title',
    release_date: '1666-6-6',
    overview: 'Some overview of the movie',
    backdrop_path: 'good ruck kid'
  });

  it('renders', () => {
    const wrapper = shallow(
      <ResultCard movie={MOVIE} />
    );

    expect(wrapper.find('h2').text()).toContain(MOVIE.get('title'));
    expect(wrapper.find('span').text()).toContain(MOVIE.get('release_date'));
    expect(wrapper.find('.description').text()).toContain(MOVIE.get('overview'));
    expect(wrapper.find(Link).length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });

});

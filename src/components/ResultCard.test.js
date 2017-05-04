import React from 'react';
import { Link } from 'react-router';

import { MOVIE } from '../../test/testFixtures';

import { shallow } from 'enzyme';
import { ResultCard } from './ResultCard';

describe('ResultCard', () => {
  it('renders', () => {
    const wrapper = shallow(<ResultCard movie={MOVIE} />);

    expect(wrapper.find('h2').text()).toContain(MOVIE.get('title'));
    expect(wrapper.find('span').text()).toContain(MOVIE.get('release_date'));
    expect(wrapper.find('.description').text()).toContain(
      MOVIE.get('overview')
    );
    expect(wrapper.find(Link).length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  });

  it('does not render if no overview', () => {
    const noOverviewMovie = MOVIE.delete('overview');
    const wrapper = shallow(<ResultCard movie={noOverviewMovie} />);

    expect(wrapper.find('noscript').length).toBe(1);
  });

  it('does not render if no backdrop_path', () => {
    const noOverviewMovie = MOVIE.delete('backdrop_path');
    const wrapper = shallow(<ResultCard movie={noOverviewMovie} />);

    expect(wrapper.find('noscript').length).toBe(1);
  });
});

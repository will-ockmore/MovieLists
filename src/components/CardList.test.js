import React from 'react';
import { List, Range } from 'immutable';

import { MOVIE } from '../../test/testFixtures';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { shallow } from 'enzyme';
import { ResultCard } from './ResultCard';
import { CardList } from './CardList';

describe('CardList', () => {
  const results = List(Range(0, 8)).map(i => MOVIE.merge({ id: `${i}` }));

  it('renders', () => {
    const wrapper = shallow(<CardList results={results} />);

    expect(wrapper.find(CSSTransitionGroup).length).toBe(1);
    expect(wrapper.find(ResultCard).length).toBe(8);
  });
});

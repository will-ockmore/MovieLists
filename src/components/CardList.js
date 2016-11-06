import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import ResultCard from './ResultCard';

export const CardList = ({ results, basePosterUrl }) =>
  <CSSTransitionGroup
    className="card-container"
    transitionName="card-anim"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={100}>
    {results.map(movie =>
        <ResultCard
          key={movie.get('id')}
          movie={movie}
          basePosterUrl={basePosterUrl}/>
    )}
  </CSSTransitionGroup>;

export default CardList;

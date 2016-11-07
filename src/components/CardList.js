import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import ResultCard from './ResultCard';

export const CardList = ({ results, smallBackdropUrl }) =>
  <CSSTransitionGroup
    className="card-container"
    transitionName="card-anim"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    {results.map(movie =>
        <ResultCard
          key={movie.get('id')}
          movie={movie}
          smallBackdropUrl={smallBackdropUrl}/>
    )}
  </CSSTransitionGroup>;

export default CardList;
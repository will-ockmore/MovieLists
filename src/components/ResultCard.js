import React from 'react';


export const ResultCard = ({ movie }) =>
  <div className="card">
    {movie.get('title')}
  </div>;

export default ResultCard;

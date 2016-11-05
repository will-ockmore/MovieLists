import React from 'react';


export const ResultCard = ({ movie, basePosterUrl }) =>
  <div className="card">
    {console.log(basePosterUrl + movie.get('poster_path'))}
    <div className="avatar">
      <img src={basePosterUrl + movie.get('poster_path')} alt="poster" />
    </div>
    <div className="text-content">
      <h2>{movie.get('title')}</h2>
      <span><i>Released:</i> {movie.get('release_date')}</span>
      <div className="description">{movie.get('overview')}</div>
    </div>
  </div>;


export default ResultCard;

import React, { Component } from 'react';


class ResultCard extends Component {
  render() {
    const { movie, baseBackdropUrl } = this.props
    const { overview, backdrop_path, title, release_date } = movie.toObject();

    if (!overview || !backdrop_path) {
      return <noscript />;
    }

    return (
      <div className="card">
        <div className="avatar pd-2">
          <img src={baseBackdropUrl + backdrop_path} alt="poster" />
        </div>
        <div className="text-content pd-2">
          <h2>{title}</h2>
          <span><i>Released:</i> {release_date}</span>
          <div className="description pd-2">{overview}</div>
        </div>
      </div>
    );
  }
}


export default ResultCard;

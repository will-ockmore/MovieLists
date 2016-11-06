import React, { Component } from 'react';
import { Link } from 'react-router';


class ResultCard extends Component {
  render() {
    const { movie, smallBackdropUrl } = this.props
    const { overview, backdrop_path, title, release_date, id } = movie.toObject();

    if (!overview || !backdrop_path) {
      return <noscript />;
    }

    return (
      <Link className="card" to={`/${id}`}>
        <div className="avatar pd-2">
          <img src={smallBackdropUrl + backdrop_path} alt="poster" />
        </div>
        <div className="text-content pd-2">
          <h2>{title}</h2>
          <span><i>Released:</i> {release_date}</span>
          <div className="description pd-2">{overview}</div>
        </div>
      </Link>
    );
  }
}


export default ResultCard;

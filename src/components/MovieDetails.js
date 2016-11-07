import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadMovieDetails } from '../redux/actions';

import Loading from './Loading';


class MovieDetails extends Component {

  componentWillMount() {
    const { loadDetails, id } = this.props;
    loadDetails(id);
  }

  componentWillReceiveProps(nextProps) {
    const { loadDetails, id } = this.props;

    if (nextProps.params.id !== id) {
      loadDetails(nextProps.id);
    }
  }

  render() {
    const { details, largeBackdropUrl } = this.props
    const { result, status } = details.toObject();

    const {
      title, backdrop_path, overview,
      tagline, release_date, vote_average,
      original_title, credits, vote_count
    } = result.toObject();

    const { cast, crew } = credits.toObject();

    console.log(result.toJS());
    if (status === 'PENDING') {
      return <Loading />;
    }

    const multipleVotes = vote_count && parseInt(vote_count, 10) > 1;

    return (
      <div className="movie-details">
        <img className="splash" src={largeBackdropUrl + backdrop_path} alt="poster" />
        <h1 className="mv-title">{title}{original_title && original_title !== title && ` (${original_title})`}</h1>
        {tagline && <h4 className="tagline">&ldquo;<em>{tagline}</em>&rdquo;</h4>}
        <div className="t-left">{overview}</div>
        <div className="t-l mt-2 fl-row">
          <div className="fl-1">
            {multipleVotes && <label className="property-title"><strong>Rating</strong> :</label>}
            <label className="property-title"><strong>Release date</strong> :</label>
          </div>
          <div className="fl-1">
            {multipleVotes &&
              <label className="property-value">
                <strong>{vote_average}</strong>/10 &nbsp;<small>(from {vote_count} votes)</small>
              </label>
            }
            <label className="property-value">{release_date}</label>
          </div>
        </div>

        <h2>Cast & crew</h2>

        <div className="fl-row">
          <div className="fl-1">
            {crew && crew.slice(0, 5).map(crewmember =>
              <label className="property-title"><strong>{crewmember.get('job')}</strong></label>
            )}
            <div className="mt-2">
              {cast && cast.slice(0, 15).map(castmember =>
                <label className="property-title"><strong>{castmember.get('character')}</strong></label>
              )}
            </div>
          </div>
          <div className="fl-1">
            {crew && crew.slice(0, 5).map(crewmember =>
              <label className="property-value">{crewmember.get('name')}</label>
            )}
            <div className="mt-2">
              {cast && cast.slice(0, 15).map(castmember =>
                <label className="property-value">{castmember.get('name')}</label>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export function mapStateToProps(state, props) {
  const { id } = props.params;
  return {
    id,
    details: state.getIn(['responses', 'movieDetails']),
    largeBackdropUrl: state.getIn(['imageUrls', 'largeBackdropUrl'])
  }
}

export default connect(mapStateToProps, { loadDetails: loadMovieDetails })(MovieDetails);

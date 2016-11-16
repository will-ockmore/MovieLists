import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadMovieDetails } from '../redux/actions';

import Loading from './Loading';


export const PropertyRow = ({ propertyTitle, children }) =>
  <div className="fl-row">
    <div className="fl-1">
      <label className="property-title">
        <strong>{propertyTitle}</strong>
      </label>
    </div>
    <div className="fl-1">
      <label className="property-value">
        {children}
      </label>
    </div>
  </div>;

export class MovieDetails extends Component {

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
      original_title, credits, vote_count,
      runtime
    } = result.toObject();

    const { cast, crew } = credits.toObject();

    if (status === 'PENDING') {
      return <Loading />;
    }

    const hasMultipleVotes = !!vote_count && parseInt(vote_count, 10) > 1;

    return (
      <div className="movie-details">
        <img className="splash" src={largeBackdropUrl + backdrop_path} alt="poster" />
        <h1 className="mv-title">{title}</h1>
        <h2>{original_title && original_title !== title && ` (${original_title})`}</h2>
        {tagline && <h4 className="tagline">&ldquo;<em>{tagline}</em> &rdquo;</h4>}

        <div className="t-left mb-2">{overview}</div>

        {hasMultipleVotes &&
          <PropertyRow propertyTitle="Rating:" >
            <strong>{vote_average}</strong>/10 &nbsp;<small>(from {vote_count} votes)</small>
          </PropertyRow>
        }

        {!!runtime &&
          <PropertyRow propertyTitle="Runtime:" >
            {runtime} mins
          </PropertyRow>
        }

        {release_date &&
          <PropertyRow propertyTitle="Release date:" >
            {release_date}
          </PropertyRow>
        }

        <h2>Cast & crew</h2>

       {crew && crew.slice(0, 5).map(crewmember =>
          <PropertyRow key={crewmember.get('credit_id')} propertyTitle={crewmember.get('job')} >
            {crewmember.get('name')}
          </PropertyRow>
        )}

       <div className="mt-2">
         {cast && cast.slice(0, 15).map(castmember =>
            <PropertyRow key={castmember.get('cast_id')} propertyTitle={castmember.get('character')} >
               {castmember.get('name')}
            </PropertyRow>
          )}
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

export default connect(
  mapStateToProps,
  {
    loadDetails: loadMovieDetails
  }
)(MovieDetails);

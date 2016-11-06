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
    const { details, largeBackdropUrl, id } = this.props
    const { result, status } = details.toObject();
    const { title, backdrop_path, overview, tagline, release_date, vote_average, original_title } = result.toObject();


    console.log(result.toJS());

    console.log(status);


    if (status === 'PENDING') {
      return <Loading />;
    }

    return (
      <div className="movie-details">
        <img className="splash" src={largeBackdropUrl + backdrop_path} alt="poster" />
        <h1 className="mv-title">{title}{original_title && original_title !== title && ` (${original_title})`}</h1>
        {tagline && <h4 className="tagline">&ldquo;<em>{tagline}</em>&rdquo;</h4>}
        <div className="t-left">{overview}</div>
        <div className="t-l">
          <div><em>Rating</em> : <b>{vote_average}</b>/10</div>
          <div><em>Release date</em> : {release_date}</div>
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

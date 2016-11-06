import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadMovieDetails } from '../redux/actions';


class MovieDetails extends Component {

  componentWillMount() {
    const { loadDetails, id } = this.props;
    loadDetails(id);
  }

  render() {
    const { details } = this.props
    // const { overview, backdrop_path, title, release_date } = details.toObject();

    console.log(details.toJS());

    if (false) {
      return <noscript />;
    }

    return (
      <div>
        {details.get('title')}
      </div>
    );
  }
}

export function mapStateToProps(state, props) {
  const { id } = props.params;
  return {
    id,
    details: state.getIn(['responses', 'movieDetails', 'result'])
  }
}

export default connect(mapStateToProps, { loadDetails: loadMovieDetails })(MovieDetails);

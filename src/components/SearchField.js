import React, { Component } from 'react';


export class SearchField extends Component {

  onEnter(event) {
    if (event.keyCode === 13 || event.keyCode === '13') {
      this.refs.searchfield.blur();
      this.props.updateQuery(event.target.value, true);
    }
  }

  render() {
    const { updateQuery, query } = this.props;

    return (
      <div className="search-input">
        <input
          ref="searchfield"
          type="text"
          value={query}
          onKeyDown={e => this.onEnter(e)}
          onChange={e => updateQuery(e.target.value)} />
      </div>
    );
  }
}

export default SearchField;




import React from 'react';


export const SearchField = ({ updateQuery, query }) =>
  <div className="search-input">
    <input type="text" value={query} onChange={e => updateQuery(e.target.value)} />
  </div>;

export default SearchField;

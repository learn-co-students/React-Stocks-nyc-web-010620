import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sortBy === "Alphabetically" ? true : false } onChange={event => props.handleSortByChange(event)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sortBy === "Alphabetically" ? false : true} onChange={event => props.handleSortByChange(event)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={event => props.handleFilterBy(event)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;

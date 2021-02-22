import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <div>
    <ul className="list-group search-results">
      {props.results.map(result => (
        <li key={result} className="list-group-item" id="results">
        </li>
      ))}
    </ul>
    <span onClick={() => props.addSchool(props.id)} id="results">  
     </span>
     </div>
  );
}

export default SearchResults;

function searchCollgeName(props) {
    return (
      <form className="search">
        <div className="input">
          <label htmlFor="college">College:</label>
          <input
            value={props.search}
            onChange={props.handleInputChange}
            name="college"
            list="colleges"
            type="text"
            className="form-control"
            placeholder="Type in a college to begin your search"
            id="college"
          />
          <datalist id="college">
            {props.colleges.map(college => (
              <option value={college} key={college} />
            ))}
          </datalist>
          <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
            Search
          </button>
        </div>
      </form>
    );
  }

export default searchCollgeName;
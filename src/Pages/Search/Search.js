import React, {Component} from 'react';
// import Jumbotron from "../../Components/jumbotron/jumbotron";
import Colleges from "../../Components/searchForms/colleges";
import "../Search/search.css";

class Search extends Component  {
    state={

      userId: this.props.userId,
      loggedIn: false

    }
    render(){
        return (
          <div> 
              <div className="Jumbotron">
                <h2 className="d-flex justify-content-center">Search your College using the criteria below
                to find your dream school</h2>
              </div>           
              <div className="card">              

                  <Colleges loggedIn={this.props.loggedIn} userId={this.props.userId}/>

              </div>
          </div>
        );
    }
};
export default Search;
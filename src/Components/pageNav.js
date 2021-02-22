import React, {Component} from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import Axios from "axios";

class pageNav extends Component {

  constructor(){
    super()
    this.state ={
      redirectTo: null,
      loggedIn: false,
      name: null
    }
    this.logout =this.logout.bind(this);
  }

  logout(event){
    event.preventDefault()
    console.log('logging user out');
    Axios.post("/users/logout").then(response => {
      console.log(response.data)
      if(response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          name: null
        })
        this.setState({
          redirectTo: "/"
        })
        return
      }
    }).catch(error => {
      console.log("Logout error " +error)
    })
  }

render() {
  const loggedIn = this.props.loggedIn
  const name= this.props.name
  console.log("Are you logged in? "+loggedIn)
  console.log(name)
 
  return (
  <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="nav">
      {loggedIn ? (
        <a className="navbar-brand" href="/">{name}'s College App</a>
      ):(
        <a className="navbar-brand" href="/">My College App</a>
      )}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          
          <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
         
        </li>
        <li className="nav-item">
          
          <a className="nav-link" href="/search">Search</a>
          
        </li>
        <li className="nav-item">
         
          <a className="nav-link" href="/saved">Saved</a>
         
        </li>
        <li className="nav-item">
          
          <a className="nav-link" href="/faq">FAQ</a>
          
        </li>
      </ul>
        
      {loggedIn ? (
          <span></span>
      ) : (
        <span className="navbar-text">
          <a className="nav-link" href="/register">Sign up  </a>
        </span>
      )
      }
    
        {loggedIn ? (
          <span className="nvabar-text">
          <a className="nav-link" onClick={this.logout} href="/">Logout</a>
          </span>
        ):(
  
      
        <span className="nvabar-text">
         <a className= "nav-link" href="/login">Login</a>
        </span>
      
        )}
        
      </div>
    </nav>

    </Router>
    
   
 );
  
}
}
export default pageNav;

import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FaqPage from './Pages/FAQ/Faq';
import Search from "./Pages/Search/Search";
import Register from './Components/Register/register';
import Home from "./Pages/Home/Home";
import Saved from "./Pages/Saved/Saved";
import Login from "./Components/Login/Login"
import PageNav from './Components/pageNav';
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state={
      loggedIn: false,
      name: null,
      userId: null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser =this.updateUser.bind(this) 
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
    console.log("USER OBJ" + userObject)
  }

  getUser() {
    axios.get("/users/").then(response => {
      // console.log("getting user");
      // console.log(response.data);
      if(response.data.user){
        // console.log("there is already a user session saved")
        this.setState({
          loggedIn: true,
          name: response.data.user.firstName,
          userId: response.data.user._id
        
        })
        console.log("App.js user Id:  "+response.data.user._id)
      }else {
        // console.log('no user yet')
        this.setState({
          loggedIn: false,
          name: null
        })
      }
    })
  }
  
  render (){
    return (
    <div className="ivy">
    <div className="college">
    
      <PageNav updateUser={this.updateUser} name={this.state.name} loggedIn={this.state.loggedIn}/>
      <Router>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Home}/>

              <Route exact path='/search' component={()=> <Search loggedIn={this.state.loggedIn} userId={this.state.userId}/>}/>
              <Route exact path='/saved' render={() =><Saved loggedIn={this.state.loggedIn} userId={this.state.userId}/>}/>

              <Route exact path='/faq' component={FaqPage}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path="/login" render={() => <Login updateUser={this.updateUser}/>}/>
            </Switch>
          </div>
        </Router>
      </div>
     </div> 
    );
  }
}
export default App;
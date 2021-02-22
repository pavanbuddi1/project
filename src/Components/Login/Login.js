import React, { Component}  from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import "./login.css"
class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            redirectTo: null,
            
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange= this.handleInputChange.bind(this);
    }
    
    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
        console.log("Name: "+name)
        console.log("Value: "+value)
        console.log("Password State: "+this.state.password)
        console.log("Email State"+this.state.email)
    }

    handleFormSubmit = event => {
        event.preventDefault();
        
        console.log(this.state.email)
        console.log(this.state.password)
        if(this.state.loggedIn === true){
            return console.log("Already logged in")
        }else{ 
        axios.post('/users/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            if(response.status === 200){
                console.log("Logged in!")
                this.props.updateUser({
                    loggedIn: true, 
                    name: response.data.firstName
                })
                this.setState({
                    redirectTo: "/"
                })
                console.log("Logged in "+this.state.loggedIn)
                
            } else {
                console.log("wrong emeail or password")
            }
        })
        .catch(error => {
            console.log(error)
        })
        }
        this.setState({
            email: "",
            password: "",
            loggedIn: true
        })
        console.log(this.state)
        return
    }

    render() {
        if(this.state.redirectTo){
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else{
        return (
            <div className="container">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1>
                        <i className="fas fa-sign-in-alt"></i> Login
                        </h1>
                        <form>
                            <div className="form-group">
                                <label for="email"> Email</label>
                                <input 
                                className="form-control"
                                type="text"
                                placeholder="John@smith.com"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange} 
                                />
                            </div>
                            <button
                            type="submit"
                            className="btn btn-info btn-block"
                            onClick={this.handleFormSubmit}
                            >Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    }
}

export default Login;
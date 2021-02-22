import React, { Component } from "react";
// import API from "../utils/API";
import "./home.css";
import axios from 'axios'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            name: ""
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

        axios.post('/users/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            if(!response.data.errmsg){
                
                console.log("Logged in!")
                
            } else {
                console.log("wrong emeail or password")
            }
        })
        .catch(error => {
            console.log(error)
        })

        this.setState({
            email: "",
            password: ""
        })
    }
    render() {
        return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        {/* <img src={column}></img> */}
                        <h1 className="d-flex justify-content-center">My College App!</h1>
                        <p className="lead d-flex justify-content-center">A full stack MERN application that lets users search for colleges and save their favorites as well as add notes</p>
                        <hr className="my-4"></hr>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {/* <div className="card card-body" id="hero">
                            <img src="https://giving.georgetown.edu/sites/default/files/styles/1600-750/public/promotion/images/20170927_UndergradStock-364.jpg?itok=b8Rr4T8V" alt="College students" />             
                        </div> */}
                    </div>
                </div>
                <br></br>
            </div>   
        </div>
        );
      }
    }
    
export default Home;
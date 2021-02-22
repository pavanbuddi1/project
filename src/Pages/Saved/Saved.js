import React, {Component} from "react";
import Axios from "axios";
import {BrowserRouter as Router} from 'react-router-dom'
import API from'../../utils/Api'
import  "./Saved.css";


class Saved extends Component {
   
    constructor(props){
    super(props)
    this.state = {

      loggedin:this.props.loggedin,
      userId: this.props.userId,

      schools: [],
      message: "Check out your saved schools and add notes"
    };
    this.getCollege = this.getCollege.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    // this.shouldComponentUpdate= this.shouldComponentUpdate.bind(this)
  
  }


  
  getCollege(){
    
    const userId = this.props.userId
    console.log("USer ID saved pg : "+ userId)
    Axios.get(`/save/`,{
      params:{
        user: userId
      }
    }).then(response => {

      if(response.data){

        console.log("get college step 4")
        console.log(response.data)

        this.setState({
          schools:response.data
        })
        return
      }else{
        return console.log('no colleges saved')
      }
    })
  }

  

  componentDidMount() {
    this.setState({
      userId:this.props.userId
    })
  }

  render(){
    console.log(this.props)
    console.log(this.state.userId)
      return (
      <div>
        
        <div className="row">
          <div className="col-sm">
            <div className="card">
              <h1 className="d-flex justify-content-center">Check out your saved schools.</h1>
              <h2 className="d-flex justify-content-center">Add notes about your schools to keep track of your journey</h2>
            </div>
          </div>
        </div>
          
        <div className="container">
        <div className="row align-items-center"> 
          <div className="col-sm">
            
            {/* Click button to show my colleges */}

        
        
       
          <button type="submit" className="btn btn-danger btn-block" onClick={this.getCollege}>
           Click to view My Saved Colleges
          </button>
          
        </div>
        </div>
        </div>
       
      

        <div className="container">
          <div className="row">
           <div className="col-sm results">
            {this.state.schools.map((result)=>
            <li className="list-group-item" key={result.id}>
              <a href="#" className="list-group-item list-group-item-action active">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Name: {result.collegeName}</h5>
                  <small className="d-inline-flex p-2">State: {result.location}</small>
                  <small className="d-inline-flex p-2">Cost (private): {result.costPrivate}</small>
                  <small className="d-inline-flex p-2">Cost (public): {result.costPublic}</small>
                  {/* <!-- Button trigger modal --> */}
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Create Note
                  </button>

                </div>
              </a>
            </li>
            )}
          </div>
        </div>
      </div>
                  {/* <!-- Modal --> */}
                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Custom Note</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <div class="form-group">
                                <label for="message-text" class="col-form-label">Note text:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>

  </div>
      )
    }
  };

export default Saved;
import React, {Component}from "react";
import API from "../../utils/Api";
import APIZip from "../../utils/ApiByZip";
import APICostPublic from "../../utils/ApiByCostPublic";
import APICostPrivate from "../../utils/ApiByCostPrivate";
import "../searchForms/colleges.css";

class Colleges extends Component {

  constructor(props){
    super(props)
    this.state = {
        college: "",
        searchedZip: "",
        costBegin: "",
        costEnd: "",
        publicChecked: false,
        privateChecked: false,
        result: [],

        userId: this.props.userId,
        loggedIn: false

    }
  }
    searchColleges = query => {
        API.search(query)
        .then(res =>
          {
            console.log("query:" + query);
            this.setState({ result: res.data.results })})
            .catch(err => console.log(err));
        };

    searchByZip = query => {
        APIZip.search(query)
        .then(res =>
          {
            console.log("query:" + query);
            this.setState({ result: res.data.results })})
            .catch(err => console.log(err));
        };

    searchByCostPublic = (query1, query2) => {
      if (this.state.publicChecked){
        console.log("begin:" + this.state.costBegin);
        console.log("end:" + this.state.costEnd);
        APICostPublic.search(this.state.costBegin, this.state.costEnd)
        .then(res =>
          {
            console.log("query1:" + query1 + " query2" + query2);
            this.setState({ result: res.data.results })})
            .catch(err => console.log(err));
      }
        };

    searchByCostPrivate = (query1, query2) => {
      if (this.state.privateChecked){
        console.log("begin:" + this.state.costBegin);
        console.log("end:" + this.state.costEnd);
        APICostPrivate.search(this.state.costBegin, this.state.costEnd)
        .then(res =>
          {
            console.log("query1:" + query1 + " query2" + query2);
            this.setState({ result: res.data.results })})
            .catch(err => console.log(err));
      }
        };

    handlePublicCheckBox = event => {
          this.setState({publicChecked:true, privateChecked:false})
          console.log(this.state.publicChecked);
    };

    handlePrivateCheckBox = event => {
          this.setState({privateChecked:true, publicChecked:false})
          console.log(this.state.privateChecked);
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
          [name]: value
        });
      };
    
      handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.publicChecked){
          this.searchByCostPublic(this.state.costBegin, this.state.costEnd);
        } else if (this.state.privateChecked){
          this.searchByCostPrivate(this.state.costBegin, this.state.costEnd);
        } else if (this.state.searchedZip != "") {
          this.searchByZip(this.state.searchedZip);
        } else if (this.state.college != "") {
          this.searchColleges(this.state.college);
        }
        else {
          alert("Try Again!");
        }
        
      };


      handleCollegeSave = id => {
        console.log(this.state.result);
        console.log("starting to save!");
        const collegeName = this.state.result.find(college => college.id === id);
        console.log(collegeName);
        console.log(collegeName.id);
        console.log(this.state.userId)

        const userCollege = this.props.userId

        API.saveCollege({
          id: collegeName.id,
          school: collegeName['school.name'],
          location: collegeName['school.state'],
          costPrivate: collegeName['latest.cost.avg_net_price.private'],
          costPublic: collegeName['latest.cost.avg_net_price.public'],
          userId: userCollege
        })
        // .then(API.getColleges());
    };  
    
    
  render () {
    console.log(this.props.userId)
    return (
    <div>
       
        <div className="form-group">
            <label htmlFor="search" id="sHead"><strong>Search by Name</strong></label>
            <input
              onChange={this.handleInputChange}
              value={this.state.college}
              name="college"
              type="text"
              className="form-control"
              placeholder="Search for a College"
              id="college"
            />
            <br></br>
            <br></br>
          
            <label htmlFor="zip" id="sHead"><strong>Search by Zip (20 mile range):</strong></label>
            <input
              onChange={this.handleInputChange}
              value={this.state.searchedZip}
              name="searchedZip"
              type="text"
              className="form-control"
              placeholder="Search for a College by Zip Code"
              id="searchedZip"
            />
            
      <br></br>
      <br></br>
      
         <label htmlFor="cost" id="sHead"><strong>Search by Tuition Cost:</strong></label>
            <br></br>
              <div className="row">
              <div className="col---6">
            <label>
                <strong>Public Institution </strong> 
                <input
                    name="public"
                    type="checkbox"
                    checked={this.state.publicChecked}
                    onChange={this.handlePublicCheckBox} />
                    </label>
                    </div>
            <br></br>
            <br></br>
            <label>
              <div className="col---6">
               <strong>Private Institution </strong>  
                <input
                    name="private"
                    type="checkbox"
                    checked={this.state.privateChecked}
                    onChange={this.handlePrivateCheckBox} />
              </div>            
            </label>
        </div>
            <input
              onChange={this.handleInputChange}
              value={this.state.costBegin}
              name="costBegin"
              type="text"
              className="form-control"
              placeholder="Tutition Cost Range - Beginning"
              id="costBegin"
            />
            <input
              onChange={this.handleInputChange}
              value={this.state.costEnd}
              name="costEnd"
              type="text"
              className="form-control"
              placeholder="Tutition Cost Range - Ending"
              id="costEnd"
            />
            <br></br>
            <button 
            onClick={this.handleFormSubmit}
             className="btn btn-primary mt-3">
              Search
            </button>
         <br></br>
         <br></br>
         </div>

        <h3 className="justify-content-center">Results:</h3>
         <ul className="list-group">
       {this.state.result.map((result)=>
        <li className="list-group-item" key={result.id}>

        <a href="#" className="list-group-item list-group-item-action active">
            <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Name: {result['school.name']}</h5>
            <small>State: {result['school.state']}</small>

            <small>Student body size: {result['latest.student.size']}</small>
            <small>Cost (private): {result['latest.cost.avg_net_price.private']}</small>
            <small>Cost (public): {result['latest.cost.avg_net_price.public']}</small>
            <small><a href={'http://' + result['school.school_url']} target='blank' class="text-white">{result['school.school_url']}</a></small>
           {this.props.loggedIn ? (
              <button
              onClick={() => this.handleCollegeSave(result.id)}
              className="btn btn-primary ml-2">
              Save
             </button>
           ):(
            <span></span>
           )
           }
            </div>
        </a>
        </li>
        )}
      </ul>
     </div>
    )
  }
}

export default Colleges;
import React, {Component} from 'react';
import pageNav from "../../Components/pageNav";
import { BrowserRouter, Link } from "react-router-dom";
import "./faq.css"

class FaqPage extends Component {

render(){
      return (
          <div>
              <div className="container faqContainer">
                <div className="jumbotron jumbotron-fluid">
                    {/* <div className="container"> */}
                        <h1 className="display-4 d-flex justify-content-center">Need Help?</h1>
                        <p className="lead d-flex justify-content-center">Here are some of the most asked questions:</p>
                    </div>
                    </div>
                <div className="card" id="faq">
                    <h3>What college should I go to? </h3>
                    <p>I don't know thats why you are here!</p>
                </div>
                    
                <div className="card" id="faq">
                    <h3>Why should I use your app?</h3>
                    <p>We give you chance to enter notes on the go
                        about the schools you are interested to remember the
                        important details about the schools you want to go to</p>
                </div>
                <div className="card" id="faq">
                    <h3>How do I begin the search?</h3>
                    <p>Enter in the criteria of the school or type
                        of school you want to and save them to your list?
                    </p>
                </div>
            </div>

        // </div>
      )
    }
};


export default FaqPage;
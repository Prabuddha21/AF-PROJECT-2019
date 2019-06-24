import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class Footer extends Component {
  render() {
    return (
      <Router>
        <footer className="footer">
          <div className="container bottom_border">
            <div className="row">
              <div className=" col-sm-4 col-md col-sm-4  col-12 col">
                <h5 className="headin5_amrc col_white_amrc pt2">Contact us</h5>

                <p className="mb10">
                  Copyright 2019 © W.W Coders. All Rights Reserved.
                </p>
                <p>
                  <i className="fa fa-location-arrow" /> 1600 Amphitheatre
                  Parkway, Mountain View, CA, 94043{" "}
                </p>
                <p>
                  <i className="fa fa-phone" /> +91-9999878398{" "}
                </p>
                <p>
                  <i className="fa fa fa-envelope" /> info@wwcoders.com{" "}
                </p>
              </div>

              <div className=" col-sm-4 col-md  col-6 col">
                <h5 className="headin5_amrc col_white_amrc pt2" />

                <ul className="footer_ul_amrc">                  
                </ul>
              </div>

              <div className=" col-sm-4 col-md  col-6 col" />

              <div className=" col-sm-4 col-md  col-12 col">
                {/* <h5 className="headin5_amrc col_white_amrc pt2">Follow us</h5> */}

                <ul className="footer_ul2_amrc">
                  {/* <li>
                    <a href="#">
                      <i className="fa fa-twitter fleft padding-right" />{" "}
                    </a>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing...
                      <a href="#">https://www.lipsum.com/</a>
                    </p>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter fleft padding-right" />{" "}
                    </a>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing...
                      <a href="#">https://www.lipsum.com/</a>
                    </p>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter fleft padding-right" />{" "}
                    </a>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing...
                      <a href="#">https://www.lipsum.com/</a>
                    </p>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="container">
            <ul className="foote_bottom_ul_amrc">
              <li>
                <Link to="/" >Home</Link>
              </li>
              <li>
              <Link to="/about" >About</Link>
              </li>              
              <li>
              <Link to="/contact" >Contact</Link>
              </li>
            </ul>

            <p className="text-center">
              Copyright @2019 | Designed by{" "}
              <a href="http://localhost:3000/">W.W Coders</a>
            </p>

            <ul className="social_footer_ul">
              <li>
                <a href="https://twitter.com/the_dempa">
                  <i className="fa fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/the_dempa">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jananath-banuka-827463124/">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/jananathbanuka/">
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Router>
    );
  }
}

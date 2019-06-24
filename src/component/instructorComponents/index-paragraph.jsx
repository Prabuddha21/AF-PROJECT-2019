import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class Paragraph extends Component {

  render() {
    return (
      <div className="container-fluid">
          <div className="row justify-content-center text-center">
                <div className="col-1"></div>                
                <div className="col-10">
                <div className="jumbotron">
                <h3 className="display-4">We are...</h3> 
                <hr className="my-4"/>
                    <p>
                        We are a leading non-state degree awarding institute approved by the University Grants Commission (UGC) under the Universities Act. We are also members of the Association of Commonwealth Universities (ACU), as well as the International Association of Universities (IAU), and the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology, UK.

                        We are proud to be listed as a leading and formidable awarding institute authorised and approved by the University Grants Commission (UGC) under the Universities Act, and the International Association of Universities (IAU). Furthermore, not only are we the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology (IET.), UK, our IT degrees are also in turn accredited by the Engineering Council, UK.
                    </p>                                       
                    </div>
                </div>
                <div className="col-1"></div>
          </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class Cards extends Component {

  render() {
    return (
      <div className="container">
          <div className="row justify-content-center text-center">
                <div className="col-3 col-xs-6" style={{margin:0}}>

                    <div className="card" style={{width: '16rem'}}>
                        <img className="card-img-top" src="http://placehold.it/100x90?" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>                            
                        </div>
                    </div>

                </div>
                <div className="col-3 col-xs-6" style={{margin:0}}>
                <div className="card" style={{width: '16rem'}}>
                        <img className="card-img-top" src="http://placehold.it/100x90?" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            
                        </div>
                    </div>
                </div>
                <div className="col-3 col-xs-6" style={{margin:0}}>
                <div className="card" style={{width: '16rem'}}>
                        <img className="card-img-top" src="http://placehold.it/100x90?" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            
                        </div>
                    </div>
                </div>

                <div className="col-3 col-xs-6" style={{margin:0}}>
                <div className="card" style={{width: '16rem'}}>
                        <img className="card-img-top" src="http://placehold.it/100x90?" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">More...</a> */}
                        </div>
                    </div>
                </div>
          </div>
      </div>
    );
  }
}

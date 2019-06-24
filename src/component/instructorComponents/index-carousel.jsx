import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import sample1 from '../../images/sample1.jpg';
import sample2 from '../../images/sample2.jpg';
import sample3 from '../../images/sample3.jpg';
import sample4 from '../../images/sample4.jpg';
import sample5 from '../../images/sample5.jpg';
import '../../css/index-footer.css'
import '../../css/instructor-profile.css'
import '../../css/instructor-login.css'

export default class CarouselComponent extends Component {

    

  render() {
    return (
      <Carousel
        showArrows
        emulateTouch
        infiniteLoop
        autoPlay
        interval={3000}
        onChange={this._onChange}
        onClickItem={this._onClickItem}
        onThumbClick={this._onClickThumb}
      >
        <div>
    <img src={sample1} /> {/*not working*/}
          <p className="legend">Welcome to W.W Coders</p>
        </div>
        <div>
          <img src={sample2} />
          <p className="legend">Faculty of Computing</p>
        </div>
        <div>
          <img src={sample5} />
          <p className="legend">Faculty of Engineering</p>
        </div>
        <div>
          <img src={sample4} />
          <p className="legend">Faculty of Business Management</p>
        </div>
      </Carousel>
    );
  }
}

import React, { Component } from 'react';

//TODO estilizar como uma página de receita

class AboutUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='about-background'>
        <div className='about-page'>
          <section className='our-mission'>
            <h2 className='about-us-header'>Our Mission</h2>
            <div className="div-bar"></div>
            <p className="about-us-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, repellendus ea! Ex soluta beatae minus, animi nesciunt voluptates porro amet adipisci voluptatem magnam iste! Magni assumenda magnam neque ratione velit.</p>
          </section>
          <section className='who-we-are'>
            <h2 className='about-us-header'>Who We Are</h2>
            <div className="div-bar"></div>
            <div className="who-we-are-description">
              <p className="about-us-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et autem dolor architecto porro aliquid! Quidem, nesciunt odio deserunt nihil asperiores deleniti inventore mollitia vitae? Placeat architecto corrupti debitis officia sequi.</p>
            </div>
            <figure className="who-we-are-image">
              {/* <img src="./public/team.jpg" alt="Us"/> */}
            </figure>
          </section>
          <section className="get-in-touch">
            <div className="row get-in-touch-row">
              <div className="col-sm pt-5">
                <h2 className='about-us-header'>Get in Touch</h2>
                <p>Send us your suggestions and comments!</p>
              </div>
              <div className="col-sm d-flex">
                <div className="about-us-form">
                  <form>
                    <div className="form-group">
                      <input className="form-control" type="text" name="name" placeholder="Name"/>
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="text" name="email" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" name="comment" id="" cols="30" rows="3"></textarea>
                    </div>
                    <div className="align-self-end">
                      <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default AboutUs;
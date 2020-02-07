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
            <p className="about-us-text">
            We seek to help people who are interested in adopting a vegetarian or vegan diet, in order to simplify access to diverse and delicious recipes.
             </p>
          </section>
          <section className='who-we-are'>
            <h2 className='about-us-header'>Who We Are</h2>
            <div className="div-bar"></div>
            <div className="who-we-are-description">
              <p className="about-us-text"> 
              Go Green was founded in 2020 by four friends during the Web Development course at Ironhack São Paulo. 

              The company was born from our interest in reducing meat consumption and making the transition as easy as possible for our users - chefs, cooks, and the curious!

              We offer a tool where people can share their recipes and also contribute to third party recipes, through evaluations or even proposing changes. 

              We hope to encourage more people to opt for meatless food, thereby reducing the impacts on the environment, personal health, and animal welfare.
              </p>
            </div>
            <figure className="who-we-are-image">
              {/* <img src="./public/team.jpg" alt="Us"/> */}
            </figure>
          </section>
          {/* <section className="get-in-touch">
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
          </section> */}
        </div>
      </div>
    )
  }
}

export default AboutUs;
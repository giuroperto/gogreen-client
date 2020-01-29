import React, { Component } from 'react';

//TODO estilizar como uma página de receita

class AboutUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='background'>
        <div className='about-page'>
          <section className='our-mission'>
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, repellendus ea! Ex soluta beatae minus, animi nesciunt voluptates porro amet adipisci voluptatem magnam iste! Magni assumenda magnam neque ratione velit.</p>
          </section>
          <section className='who-we-are'>
            <h2>Who We Are</h2>
            <div className="who-we-are-description">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et autem dolor architecto porro aliquid! Quidem, nesciunt odio deserunt nihil asperiores deleniti inventore mollitia vitae? Placeat architecto corrupti debitis officia sequi.</p>
            </div>
            <figure className="who-we-are-image">
              <img src="./public/team.jpg" alt="Us"/>
            </figure>
          </section>
          <section className="get-in-touch">
            <h2>Get in Touch</h2>
            <p>Send us your suggestions and comments!</p>
            <form>
              <input type="text" name="name" placeholder="Name"/>
              <input type="text" name="email" placeholder="Email"/>
              <textarea name="comment" id="" cols="30" rows="10"></textarea>
              <button type="submit">Submit</button>
            </form>
          </section>
        </div>
      </div>
    )
  }
}

export default AboutUs;
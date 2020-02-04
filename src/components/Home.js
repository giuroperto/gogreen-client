import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Message from './Message';

//TODO deixar featured recipes responsivo; mostrar uma de cada vez? wrap

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
      
      {
        this.props.message && <Message successMessage={this.props.successMessage} message={this.props.message}/>
      }

        <section className="d-flex justify-content-start align-items-start section1-container">
          <div className="section1-div">
            <h2>GoGreen</h2>
            <h4>Find and share V recipes</h4>
            <button type="button" className="btn btn-success">
              Let's begin
            </button>
          </div>
        </section>

        <section className='section2'>
          <div className="container-fluid">
            <div className="mt-5 mb-3 d-flex flex-column align-items-center">
              <h3 className="">How it works?</h3>
              <div className="div-bar"></div>
            </div>

            <div className="d-flex row justify-content-sm-around">
              <div className="col-sm section2-container">
                <img src="./images/chef-hat.png" alt="fork" />
                <h4 className="hello">Be the chef</h4>
                <p className="text-muted">
                  Share your way of cook in a step-by-step recipe
                </p>
              </div>

              <div className="col-sm section2-container">
                <img src="./images/cook.png" alt="fork" />
                <h4 className="hello">Find the ideal recipe</h4>
                <p className="text-muted">
                  Over 1,000 vegan, vegetarian and wolrdwide recipes for all
                  levels
                </p>
              </div>

              <div className="col-sm section2-container">
                <img src="./images/powder.png" alt="fork" />
                <h4 className="hello">Fork and improve their recipes</h4>
                <p className="text-muted">
                  As an open-source recipes base, GoGreen allow users suggesting
                  improvements to other chefs' recipe
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="container-fluid featured-recipes mt-5"
          style={{ width: "85%" }}
        >
          <div className="mt-5 mb-2 d-flex flex-column align-items-center">
            <h3 className="">How skilled do you feel today?</h3>
            <div className="div-bar"></div>
          </div>

          <div className="row">
            <div className="col-sm">
              <Link to="/recipe/5e384386b742f83ceec52f23" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/home-images/pasta.jpg")',
                    backgroundSize: "cover",
                    height: "45vh"
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name">Creamy Avocado Pasta</h2>
                  </div>
                </article>
              </Link>
              <div className="difficulty-link">
                <Link to="/allrecipes">
                  <div className="difficulty icon">
                    <img src="" alt="" />
                  </div>
                  <h4 className="difficulty-text">Just starting out?</h4>
                  <p>
                    See more <strong>Easy</strong> recipes
                  </p>
                </Link>
              </div>
            </div>
            <div className="col-sm">
              <Link to="/recipe/5e384386b742f83ceec52f43" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/home-images/burger.jpeg")',
                    backgroundSize: "cover",
                    height: "45vh"
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name">Bean Burgers with Spicy Guacamole</h2>
                  </div>
                </article>
              </Link>
              <div className="difficulty-link">
                <Link to="/allrecipes">
                  <div className="difficulty icon">
                    <img src="" alt="" />
                  </div>
                  <h4 className="difficulty-text">Get a meal ready in minutes</h4>
                  <p>
                    See more <strong>Medium</strong> recipes
                  </p>
                </Link>
              </div>
            </div>
            <div className="col-sm">
              <Link to="/recipe/5e384386b742f83ceec530d8" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/home-images/lentil.jpg")',
                    backgroundSize: "cover",
                    height: "45vh"
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name">Red Lentils and Spinach in Masala Sauce</h2>
                  </div>
                </article>
              </Link>
              <div className="difficulty-link">
                <a href="">
                  <div className="difficulty-icon">
                    <img src="" alt="" />
                  </div>
                  <h4 className="difficulty-text">Feeling adventurous?</h4>
                  <p className="difficulty-link">
                    See more <strong>Hard</strong> recipes
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        
<footer className="mt-5 page-footer font-small unique-color-dark" style={{ 'background-color': '#e0e0e0 ' }}>

  <div style={{ 'background-color': '#616161 ' }}>
    <div className="container">
      <div className="row py-4 d-flex align-items-center">
        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
          <h6 className="mb-0">Get connected with us on social networks!</h6>
        </div>
        <div className="col-md-6 col-lg-7 text-center text-md-right">

    
          <a className="fb-ic">
            <i className="fab fa-facebook-f white-text mr-4"> </i>
          </a>
  
          <a className="tw-ic">
            <i className="fab fa-twitter white-text mr-4"> </i>
          </a>
  
          <a className="gplus-ic">
            <i className="fab fa-google-plus-g white-text mr-4"> </i>
          </a>
  
          <a className="li-ic">
            <i className="fab fa-linkedin-in white-text mr-4"> </i>
          </a>
  
          <a className="ins-ic">
            <i className="fab fa-instagram white-text"> </i>
          </a>

        </div>
        

      </div>

    </div>
  </div>
  <div className="container text-center text-md-left mt-5">

    <div className="row mt-3">

      
      <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">


        <h6 className="text-uppercase font-weight-bold">GoGreen Inc.</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro quis explicabo cum dolor, quidem deleniti reiciendis quo blanditiis corrupti enim illum incidunt! Blanditiis incidunt debitis ipsa, ducimus ut unde molestiae?</p>

      </div>
      

      
      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase font-weight-bold">Products</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px' }}/>
        <p>
          <a href="#!">All Recipes</a>
        </p>
        <p>
          <a href="#!">Why GoGreen?</a>
        </p>
        <p>
          <a href="#!">About Us</a>
        </p>

      </div>
      

      
      <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase font-weight-bold">Useful links</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
        <p>
          <a href="#!">Sign Up for free</a>
        </p>
        <p>
          <a href="#!">Login</a>
        </p>
        <p>
          <a href="#!">Add Recipe</a>
        </p>

      </div>
      

      
      <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        <h6 className="text-uppercase font-weight-bold">Contact</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}/>
        <p>
          <i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
        <p>
          <i className="fas fa-envelope mr-3"></i> info@example.com</p>
        <p>
          <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
        <p>
          <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>

      </div>

    </div>

  </div>

  <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
  </div>

</footer>


        
      </div>
    );
  }
}

export default Home;


// trazer getmessage e success message -> para rendererizar condicional
// passar o message
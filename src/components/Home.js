import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
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

        <section className="d-flex justify-content-center align-items-center section1-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <div className="section1-div d-flex flex-column align-items-center">
                  <h2>Go Green</h2>
                  <h4>Find and share vegetarian and vegan recipes</h4>
                  <Link to="/login">
                    <button type="button" className="btn btn-success">
                      Let's begin
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-sm-4">
              </div>
            </div>
          </div>
            <div className='hash-link'>
            <HashLink to="#section-2"><i class="fas fa-chevron-down hash-link-icon"></i></HashLink>
            </div>
        </section>

        <section className='section2' id='section-2'>
          <div className="container-fluid">
            <div className="mt-5 mb-3 d-flex flex-column align-items-center">
              <h3>How does it work?</h3>
              <div className="div-bar mb-5"></div>
            </div>

            <div className="d-flex row justify-content-sm-around">
              <div className="col-sm section2-container">
                <img src="./images/chef-hat.png" alt="fork" />
                <h4 className="hello">Be the chef</h4>
                <p className="text-muted">
                  Share your way of cooking in a step-by-step recipe
                </p>
              </div>

              <div className="col-sm section2-container">
                <img src="./images/cook.png" alt="fork" />
                <h4 className="hello">Find the ideal recipe</h4>
                <p className="text-muted">
                  Over 1,000 vegan, vegetarian and worldwide recipes for all
                  levels
                </p>
              </div>

              <div className="col-sm section2-container">
                <img src="./images/powder.png" alt="fork" />
                <h4 className="hello">Fork and improve their recipes</h4>
                <p className="text-muted">
                  As an open-source recipes base, GoGreen allows users to suggest
                  improvements to other chefs' recipes
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="container-fluid featured-recipes mt-5"
        >
          <div className="mt-5 d-flex flex-column align-items-center featured-recipes-child">
            <h3 className="">How skilled do you feel today?</h3>
          </div>

          <div className="row">
            <div className="col-sm mb-4">
              <Link to="/recipe/5e3c4c12af5c58a3880cf666" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/home-images/pasta.jpg")'
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name pl-2 pr-2">Fun and Easy Creamy Avocado Pasta</h2>
                  </div>
                </article>
              </Link>
              <div className="difficulty-div">
                <Link to="/allrecipes">
                  <div className="difficulty-icon-div">
                    <img className="difficulty-icon" src="./images/home-images/easy.png" alt="Easy" />
                  </div>
                  <h4 className="difficulty-text">Just starting out?</h4>
                  <p className="difficulty-link">
                    See more <strong>Easy</strong> recipes
                  </p>
                </Link>
              </div>
            </div>
            <div className="col-sm mb-4">
              <Link to="/recipe/5e3c4c12af5c58a3880cf686" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/home-images/burger.jpeg")'
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name pl-2 pr-2">Bean Burgers with Spicy Guacamole</h2>
                  </div>
                </article>
              </Link>
              <div className="difficulty-div">
                <Link to="/allrecipes">
                  <div className="difficulty-icon-div">
                    <img className="difficulty-icon" src="./images/home-images/medium.png" alt="Medium" />
                  </div>
                  <h4 className="difficulty-text">Try something new?</h4>
                  <p className="difficulty-link">
                    See more <strong>Medium</strong> recipes
                  </p>
                </Link>
              </div>
            </div>
            <div className="col-sm mb-4">
              <Link to="/recipe/5e3c4c12af5c58a3880cf81b" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/home-images/lentil.jpg")'
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name pl-2 pr-2">Red Lentils and Spinach in Masala Sauce</h2>
                  </div>
                </article>
              </Link>
              <div className="difficulty-div">
                <Link to="/allrecipes">
                  <div className="difficulty-icon-div">
                    <img className="difficulty-icon" src="./images/home-images/hard.png" alt="Hard" />
                  </div>
                  <h4 className="difficulty-text">Feeling adventurous?</h4>
                  <p className="difficulty-link">
                    See more <strong>Hard</strong> recipes
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

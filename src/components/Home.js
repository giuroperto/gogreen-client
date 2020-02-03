import React, { Component } from "react";

//TODO deixar featured recipes responsivo; mostrar uma de cada vez? wrap

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <section className="d-flex justify-content-center align-items-center section1-container">
          <div className="section1-div">
            <h2>GoGreen</h2>
            <h4>Find and share V recipes</h4>
            <button type="button" className="btn btn-success">
              Let's begin
            </button>
          </div>
        </section>

        <section className="d-flex row">
          <div className="col-sm mt-5 section2-container">
            <img src="./images/chef-hat.png" alt="fork" />
            <h4 className="hello">Be the chef</h4>
            <p className="text-muted">
              Share your way of cook in a step-by-step recipe
            </p>
          </div>

          <div className="col-sm mt-5 section2-container">
            <img src="./images/cook.png" alt="fork" />
            <h4 className="hello">Find the ideal recipe</h4>
            <p className="text-muted">
              Over 1,000 vegan, vegetarian and wolrdwide recipes for all levels
            </p>
          </div>

          <div className="col-sm mt-5 section2-container">
            <img src="./images/powder.png" alt="fork" />
            <h4 className="hello">Fork and improve their recipes</h4>
            <p className="text-muted">
              As an open-source recipes base, GoGreen allow users suggesting
              improvements to other chefs' recipe
            </p>
          </div>
        </section>

        <div
          className="container-fluid featured-recipes mt-5"
          style={{ width: "85%" }}
        >

          <div className='my-5 d-flex flex-column align-items-center'>
          <h3 className="">How skilled are you today?</h3>
          <div className='div-bar'></div>
          </div>



          <div className="row">
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/pudim.jpg")',
                    backgroundSize: "cover",
                    height: "45vh"
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name">Pudim de coco</h2>
                  </div>
                </article>
              </a>
              <div className="difficulty-link">
                <a href="">
                  <div className="difficulty icon">
                    <img src="" alt="" />
                  </div>
                  <p className="difficulty-text">Get a meal ready in minutes</p>
                  <h4>
                    See more <strong>Easy</strong> recipes
                  </h4>
                </a>
              </div>
            </div>
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/pudim.jpg")',
                    backgroundSize: "cover",
                    height: "45vh"
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name">Pudim de coco</h2>
                  </div>
                </article>
              </a>
              <div className="difficulty-link">
                <a href="">
                  <div className="difficulty icon">
                    <img src="" alt="" />
                  </div>
                  <p className="difficulty-text"></p>
                  <h4>
                    See more <strong>Medium</strong> recipes
                  </h4>
                </a>
              </div>
            </div>
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article
                  className="feat-recipe d-flex justify-content-center align-items-end"
                  style={{
                    backgroundImage: 'url("./images/pudim.jpg")',
                    backgroundSize: "cover",
                    height: "45vh"
                  }}
                >
                  <div className="text-box">
                    <h2 className="recipe-name">Pudim de coco</h2>
                  </div>
                </article>
              </a>
              <div className="difficulty-link">
                <a href="">
                  <div className="difficulty-icon">
                    <img src="" alt="" />
                  </div>
                  <p className="difficulty-text">Feeling adventurous?</p>
                  <h4>
                    See more <strong>Hard</strong> recipes
                  </h4>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container-fluid category-links"
          style={{ width: "85%" }}
        >
          <div className="dish-types-links">
            <h4>Dish Types</h4>
            <div className="row">
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
            </div>
          </div>

          <div className="container-fluid cuisines-links">
            <h4>Cuisines</h4>
            <div className="row">
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img
                    src="./images/home-images/maincourse.jpg"
                    alt="Main Course"
                  />
                  <h5>Main Course</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

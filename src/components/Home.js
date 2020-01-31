import React, { Component } from 'react';

//TODO deixar featured recipes responsivo; mostrar uma de cada vez? wrap 

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="home-container">
        <div className="container-fluid featured-recipes mt-5" style={{width: '85%'}}>
          <div className="row">
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article className="feat-recipe d-flex justify-content-center align-items-end" style={{backgroundImage: 'url("./images/pudim.jpg")', backgroundSize: 'cover', height: '45vh'}}>
                  <div className="text-box">
                    <h2 className="recipe-name">Pudim de coco</h2>
                  </div>
                </article>
              </a>
              <div className="difficulty-link">
                  <a href="">  
                    <div className="difficulty icon">
                      <img src="" alt=""/>
                    </div>
                    <p className="difficulty-text">Get a meal ready in minutes</p>
                    <h4>See more <strong>Easy</strong> recipes</h4>
                  </a>
              </div>
            </div>
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article className="feat-recipe d-flex justify-content-center align-items-end" style={{backgroundImage: 'url("./images/pudim.jpg")', backgroundSize: 'cover', height: '45vh'}}>
                  <div className="text-box">
                    <h2 className="recipe-name">Pudim de coco</h2>
                  </div>
                </article>
              </a>
              <div className="difficulty-link">
                  <a href="">  
                    <div className="difficulty icon">
                      <img src="" alt=""/>
                    </div>
                    <p className="difficulty-text"></p>
                    <h4>See more <strong>Medium</strong> recipes</h4>
                  </a>
              </div>
            </div>
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article className="feat-recipe d-flex justify-content-center align-items-end" style={{backgroundImage: 'url("./images/pudim.jpg")', backgroundSize: 'cover', height: '45vh'}}>
                  <div className="text-box">
                    <h2 className="recipe-name">Pudim de coco</h2>
                  </div>
                </article>
              </a>
              <div className="difficulty-link">
                  <a href="">  
                    <div className="difficulty-icon">
                      <img src="" alt=""/>
                    </div>
                    <p className="difficulty-text">Feeling adventurous?</p>
                    <h4>See more <strong>Hard</strong> recipes</h4>
                  </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid category-links" style={{width: '85%'}}>
          <div className="dish-types-links">
            <h4>Dish Types</h4>
            <div className="row">
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
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
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
              <div className="cuisine-figure col-xs-6 col-sm-3">
                <a href="">
                  <img src="./images/home-images/maincourse.jpg" alt="Main Course"/>
                  <h5>Main Course</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
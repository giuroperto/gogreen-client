import React, { Component } from 'react';

//TODO deixar featured recipes responsivo; mostrar uma de cada vez? wrap 

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="home-container">
        <div className="container-fluid featured-recipes">
          <div className="row">
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article className="feat-recipe d-flex justify-content-center align-items-end" style={{backgroundImage: 'url("./images/pudim.jpg")', backgroundSize: 'cover', height: '45vh'}}>
                  {/* <img src="./images/pudim.jpg" alt=""/> */}
                  <h2 className="mb-5">Pudim de coco</h2>
                </article>
              </a>
              <div className="difficulty-link">
                  <a href="">  
                    <div className="difficulty icon">
                      <img src="" alt=""/>
                    </div>
                    <h4>See more Easy recipes</h4>
                  </a>
              </div>
            </div>
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article className="feat-recipe d-flex justify-content-center align-items-end" style={{backgroundImage: 'url("./images/pudim.jpg")', backgroundSize: 'cover', height: '45vh'}}>
                  {/* <img src="./images/pudim.jpg" alt=""/> */}
                  <h2 className="mb-5">Pudim de coco</h2>
                </article>
              </a>
              <div className="difficulty-link">
                  <a href="">  
                    <div className="difficulty icon">
                      <img src="" alt=""/>
                    </div>
                    <h4>See more Easy recipes</h4>
                  </a>
              </div>
            </div>
            <div className="col-sm">
              <a href="" className="recipe-link">
                <article className="feat-recipe d-flex justify-content-center align-items-end" style={{backgroundImage: 'url("./images/pudim.jpg")', backgroundSize: 'cover', height: '45vh'}}>
                  {/* <img src="./images/pudim.jpg" alt=""/> */}
                  <h2 className="mb-5">Pudim de coco</h2>
                </article>
              </a>
              <div className="difficulty-link">
                  <a href="">  
                    <div className="difficulty icon">
                      <img src="" alt=""/>
                    </div>
                    <h4>See more Easy recipes</h4>
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
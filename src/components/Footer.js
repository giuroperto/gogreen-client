import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <MDBFooter className="font-small pt-2 footer">
      <MDBContainer>
        <MDBRow className="pt-3 mb-3 text-center d-flex justify-content-center footer-links">
        <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
            <Link to='/'>Home</Link>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <Link to='/aboutus'>About Us</Link>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
            <Link to='/allrecipes'>All Recipes</Link>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
            <Link to='/signup'>Sign Up</Link>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
            <Link to='/login'>Login</Link>
            </h6>
          </MDBCol>
        </MDBRow>
        <hr className="rgba-white-light" style={{ margin: "0 15vw 2vh 15vw" }} />
        <MDBRow>
          <MDBCol md="12" className="mt-2">
            <div className="mb-1 flex-center footer-icons">
              <a className="fb-ic">
              <Link to="#facebook">
                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </Link>
              </a>
              <a className="tw-ic">
              <Link to="#twitter">
                <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </Link>
              </a>
              <a className="gplus-ic">
              <Link to="#googleplus">
                <i className="fab fa-google-plus fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </Link>
              </a>
              <a className="li-ic">
              <Link to="#linkedin">
                <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </Link>
              </a>
              <a className="ins-ic">
              <Link to="#instagram">
                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </Link>
              </a>
              <a className="pin-ic">
              <Link to="#pintrest">
                <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
              </Link>
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center pt-3 pb-1 footer-copyrights">
        <MDBContainer fluid>
          <p>@2020 Copyrigths: <Link to='/'> GoGreen.com</Link></p>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, alias tenetur omnis ipsam impedit veritatis nemo porro obcaecati! Blanditiis et eligendi expedita inventore at suscipit perferendis dolor obcaecati vero adipisci.
             {/* Buscamos auxiliar pessoas que tenham interesse em adotar uma dieta vegetariana ou vegana, de forma a simplificar o acesso à diversas receitas dos mais variados níveis de dificuldade. */}
             </p>
          </section>
          <section className='who-we-are'>
            <h2 className='about-us-header'>Who We Are</h2>
            <div className="div-bar"></div>
            <div className="who-we-are-description">
              <p className="about-us-text"> 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aliquid deleniti dolor et corrupti harum id praesentium exercitationem assumenda, a culpa laudantium obcaecati possimus iure ut quibusdam facilis modi incidunt.
              
              {/* A Go Green foi fundada em 2020 por quatro amigos durante o curso de Web Development na Ironhack São Paulo. A empresa surgiu do interesse dos integrantes em reduzir o consumo de carne e do entendimento que essa transição de hábito alimentar é um processo consideravelmente difícil, seja pela necessidade de repor a proteína com base em outra fonte seja pela dificuldade em encontrar receitas saborosas e nutritivas. Oferecemos uma ferramenta onde as pessoas podem compartilhar suas receitas e também contribuir com receitas de terceiros, por meio de avaliações ou mesmo propondo alterações. Esperamos assim incentivar mais pessoas a optarem por uma alimentação sem carne e reduzir os impactos no meio-ambiente e no bem estar dos animais.  */}
              </p>
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
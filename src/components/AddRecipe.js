import React, { Component } from 'react';
import MasterForm from './recipe-forms/MasterForm'

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="background">
        <MasterForm allData={this.props.allData} />
      </div>
    )
  }
}

export default Navbar;
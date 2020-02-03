import React, { Component } from 'react';
import MasterForm from './recipe-forms/MasterForm'

class AddRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="background">
        <MasterForm allData={this.props.allData} {...this.props} />
      </div>
    )
  }
}

export default AddRecipe;
import React, { Component } from 'react';
import MasterForm from './recipe-forms/MasterForm'

class AddRecipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="background d-flex justify-content-center">
        <MasterForm allData={this.props.allData} message={this.props.message} successMessage={this.props.successMessage} getMessage={this.props.getMessage} {...this.props} />
      </div>
    )
  }
}

export default AddRecipe;
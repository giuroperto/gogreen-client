import React, { Component } from 'react';
import MasterForm from './recipe-forms/MasterForm';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueRecipe: {}
    }
  }

  componentDidMount() {
    const { recipeID } = this.props.match.params;
    
    // axios.get(`/recipe/${recipeID}`)
    // .then(response => {
    //   this.setState({
    //     uniqueRecipe: response.data
    //   })
    // })
    // .catch(err => console.log(err))
  }

  render() {
    return(
      <div className="container">
        <MasterForm recipe={uniqueRecipe}/>
      </div>
    )
  }
}

export default EditRecipe;
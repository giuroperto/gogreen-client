import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AllRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(event) {
  //   const { value } = event.target;
  //   this.setState({
  //     searchWord: value,
  //   });
  // }

  render() {
    return(
      <div>
        <input type="text" name="searchWord" id="searchWord" value={this.state.searchWord} placeholder="Search recipe..." onChange={this.handleChange} />
        {
          this.props.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchWord.toLowerCase())).map(recipe => <Link to="/main" className="recipes-link">{recipe.name} </Link>)
        }
      </div>
    )
  }
}

export default AllRecipes;
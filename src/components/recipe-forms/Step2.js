import React, {Component} from 'react';

// dish types + cuisines + servings


class Step2 extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    
    return(
      <>
      <div className="form-group">
        <label htmlFor="dishTypes">What <strong>dish type</strong> is your recipe?</label>
        <select value={this.props.dishTypes} name="dishTypes" onChange={this.props.handleChange} multiple={false} className="custom-select">
          <option value=''>Choose a dish type</option>
          {this.props.allData.dishTypesArr.map((dishType, idx) => <option key={idx} value={dishType}>{dishType}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cuisines">Your recipe belongs to which <strong>cuisine</strong>?</label>
        <select value={this.props.cuisines} name="cuisines" onChange={this.props.handleChange} multiple={false} className="custom-select">
          <option value=''>Choose a cuisine</option>
          {this.props.allData.cuisinesArr.map((cuisine, idx) => <option key={idx} value={cuisine}>{cuisine}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="servings">How many <strong>servings</strong> is your recipe?</label>
        <input className="form-control" type="number" name="servings" min="1" required value={this.props.servings} onChange={this.props.handleChange}/>
      </div>
      </>
    )
  }
}

export default Step2;
import React, {Component} from 'react';

// name + description

class Step1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentStep !== 1) {
      return null
    }

    return(
      <>
      <div className="form-group">
        <label htmlFor="name">What's the <strong>name</strong> of your recipe?</label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          value={this.props.name}
          onChange={this.props.handleChange}
        />
        <label htmlFor="description">Add a brief <strong>description</strong> for your dish</label>
        <input
          className="form-control"
          id="description"
          name="description"
          type="text"
          value={this.props.description}
          onChange={this.props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="file">Add a <strong>picture</strong> of your dish</label>
        <input type="file" class="form-control-file" id="file" onChange={this.props.handleFileUpload}/>
      </div>
      </>
    )
  }
}

export default Step1;
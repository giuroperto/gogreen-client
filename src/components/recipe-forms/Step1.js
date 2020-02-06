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
          required
        />
        <label htmlFor="description">Add a brief <strong>description</strong> for your dish</label>
        <input
          className="form-control"
          id="description"
          name="description"
          type="text"
          value={this.props.description}
          onChange={this.props.handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="file">Add a <strong>picture</strong> of your dish</label>
        <div className="input-group d-flex flex-column">
          <div className="custom-file">
          <input type="file" className="form-control-file custom-file-input" id="file" name="file" required onChange={this.props.handleFileUpload}/>
          <label className="custom-file-label img-name" forHtml="file"> {this.props.pictureName ? this.props.pictureName : 'Choose file...'} </label>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Step1;
import React, {Component} from 'react';

// instructions + difficulty


class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumber: 3,
      inputs: [
        { key: 0, textName: 'instruction0', timeName:'timeMinutes0' },
        { key: 1, textName: 'instruction1', timeName:'timeMinutes1' },
        { key: 2, textName: 'instruction2', timeName:'timeMinutes2' },],
      instructions: {
        name: "instructions",
        values: [
          {
            step: 1,
            text: '',
            timeMinutes: 0,
          },
          {
            step: 2,
            text: '',
            timeMinutes: 0,
          },
          {
            step: 3,
            text: '',
            timeMinutes: 0,
          }]
      }
    }
    this.addInput = this.addInput.bind(this);
    // this.removeInput = this.removeInput.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addInput() {
    let newInputNumber = this.state.inputNumber + 1;
    let inputsCopy = [...this.state.inputs];
    inputsCopy.push({ key: newInputNumber, textName: 'instruction' + newInputNumber, timeName: 'timeMinutes' + newInputNumber })
    let instructionsValuesCopy = [...this.state.instructions.values];
    instructionsValuesCopy[newInputNumber] = {...instructionsValuesCopy[newInputNumber]};
    this.setState({
      inputNumber: newInputNumber,
      inputs: inputsCopy,
      instructions: {
        values: instructionsValuesCopy
      }
    })
  }

  renderInputs() {
    let inputs = [];
    for (let i = 0; i < this.state.inputNumber; i += 1) {
      let textName = 'instruction' + i;
      let timeName = 'timeMinutes' + i;
      inputs.push({ key: i, textName, timeName })
    }
    this.setState({
      inputs: inputs
    }) 
  }

  handleChange(event) {
    const { value, name } = event.target;
    const myKey = event.target.dataset.key;
    let instructionsCopy = [...this.state.instructions.values];
    instructionsCopy[myKey] = {...instructionsCopy[myKey]}
    if (name.includes('instruction')) {
      instructionsCopy[myKey].text = value;
      this.setState({
        step: myKey + 1,
        instructions: instructionsCopy
      }, this.handleInstructions);
    } else if (name.includes('time')) {
      instructionsCopy[myKey].timeMinutes = value;
      this.setState({
        instructions: instructionsCopy
      }, this.handleInstructions);
    }
  }

  handleInstructions() {
    this.props.passInstructions(this.state.instructions);
  }

  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }
    
    return(
      <>
      <div className="form-group">
        <label htmlFor="instructions">Detail your recipe <strong>instructions</strong> here.</label>
        {this.state.inputs.map(input => (
          <div className="form-row">
            <div class="col-md-9 mb-3">
              <label>Step</label>
              <input key={input.key} data-key={input.key} className="form-control" type="text" name={input.textName} value={this.state.instructions.values[input.key].text} onChange={this.handleChange}/>
            </div>
            <div class="col-md-3 mb-3">
              <label htmlFor="time">Time (minutes)</label>
              <input key={input.key} data-key={input.key} className="form-control" type="number" name={input.timeName} value={this.state.instructions.values[input.key].timeMinutes} onChange={this.handleChange}/>
            </div>
          </div>
        ))}
        <button 
          className="btn btn-secondary"
          type="button" onClick={this.addInput}>+</button>
      </div>
      <div class="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isVegan"
          checked={this.props.isVegan}
          onChange={this.props.handleChange}/>
        <label className="form-check-label" for="isVegan">This is a <strong>vegan</strong> recipe</label>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">How <strong>difficult</strong> is this recipe?</label>
        <select value={this.props.difficulty} onChange={this.props.handleChange} class="custom-select">
          <option value=''>Choose a difficulty</option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
      </div>
      
      <button type="submit">Submit Recipe</button>
      </>
    )
  }
}

export default Step4;
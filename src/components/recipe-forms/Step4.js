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
    // this.renderInputs = this.renderInputs.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addInput() {
    let index = this.state.inputNumber;
    let inputsCopy = [...this.state.inputs];
    inputsCopy.push({ key: index, textName: 'instruction' + index, timeName: 'timeMinutes' + index })
    let instructionsValuesCopy = [...this.state.instructions.values];
    instructionsValuesCopy[index] = {
      step: index,
      text: '',
      timeMinutes: 0,
    };
    console.log(inputsCopy);
    console.log(instructionsValuesCopy);
    this.setState({
      inputNumber: this.state.inputNumber + 1,
      inputs: inputsCopy,
      instructions: {
        name: 'instructions',
        values: instructionsValuesCopy
      }
    })
  }

  // renderInputs() {
  //   let inputs = [];
  //   for (let i = 0; i < this.state.inputNumber; i += 1) {
  //     let textName = 'instruction' + i;
  //     let timeName = 'timeMinutes' + i;
  //     inputs.push({ key: i, textName, timeName })
  //   }
  //   this.setState({
  //     inputs: inputs
  //   }) 
  // }

  handleChange(event) {
    const { value, name } = event.target;
    const myKey = event.target.dataset.key;
    let instructionsValuesCopy = [...this.state.instructions.values];
    instructionsValuesCopy[myKey] = {...instructionsValuesCopy[myKey]}

    if (name.includes('instruction')) {
      instructionsValuesCopy[myKey].text = value;
      this.setState({
        instructions: {
          name: 'instructions',
          values: instructionsValuesCopy
        }
      }, this.handleInstructions);
    } else if (name.includes('time')) {
      instructionsValuesCopy[myKey].timeMinutes = value;
      this.setState({
        instructions: {
          name: 'instructions',
          values: instructionsValuesCopy
        }
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
          <div key={input.key} className="form-row">
            <div className="col-md-9 mb-3">
              <label>Step</label>
              <input key={input.key} data-key={input.key} className="form-control" type="text" name={input.textName} value={this.state.instructions.values[input.key].text} onChange={this.handleChange}/>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="time">Time (minutes)</label>
              <input key={input.key} data-key={input.key} className="form-control" type="number" name={input.timeName} value={this.state.instructions.values[input.key].timeMinutes} onChange={this.handleChange}/>
            </div>
          </div>
        ))}
        <button 
          className="btn btn-secondary"
          type="button" onClick={this.addInput}>+</button>
      </div>
      </>
    )
  }
}

export default Step4;
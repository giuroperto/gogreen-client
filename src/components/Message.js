import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
      {
        this.props.success ? <p className="success-message">{this.props.message}</p> : <p className="failure-message">{this.props.message}</p>
      }
      </div>
    )
  }


}

export default Message;

//pass success or failure in order to render it with correct styling
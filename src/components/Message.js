import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
        <p>{this.props.message}</p>
      </div>
    )
  }


}

export default Message;
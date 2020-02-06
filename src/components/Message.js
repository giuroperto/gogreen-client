import React, { Component } from 'react';
// import 'mdbreact';
// import "mdbreact/dist/css/mdb.css";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
      {
        this.props.successMessage ? <p className="success-message fade-out message animated slower fadeIn">{this.props.message}</p> : <p className="failure-message fade-out message animated slower fadeIn">{this.props.message}</p>
      }
      </div>
    )
  }


}

export default Message;

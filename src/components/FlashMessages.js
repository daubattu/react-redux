import React, { Component } from 'react';
import { delFlashMessage } from '../actions/flashMessages.js';
import { connect } from 'react-redux';

class FlashMessages extends Component {
  delFlashMessage(id) {
    this.props.delFlashMessage(id);
  }

  render() {
    const { flashMessages } = this.props;
    return(
      <div className="container">
        {
          flashMessages.map((flashMessage, index) => {
            return(
              <div key={index} className="alert alert-success" role="alert">
              { flashMessage.text }
              <span
                onClick={() => { this.delFlashMessage(flashMessage.id)}}
                style={{float: 'right'}}
                className="glyphicon glyphicon-remove"
              >
              </span>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default connect((state) => {
  return { flashMessages: state.flashMessages} },
  { delFlashMessage }
)(FlashMessages);

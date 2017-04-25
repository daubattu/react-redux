import React, { Component } from 'react';
import NavigationBar from './NavigationBar.js';
import { connect } from 'react-redux';
import FlashMessages from './FlashMessages.js';

class App extends Component {
  render() {

    const { flashMessages } = this.props;
    console.log('this.props', this.props);
    return(
      <div>
        <NavigationBar />
        {
          flashMessages.length > 0
          ? <FlashMessages flashMessages={ flashMessages } />
          : ''
        }
        {this.props.children}
      </div>
    )
  }
}

export default connect((state) => {
  return { flashMessages: state.flashMessages} },
  null
)(App);

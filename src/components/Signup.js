import React, { Component } from 'react';
import axios from 'axios';
import timezones from '../data/timezones.js';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists} from '../actions/users.js';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../server/shared/validations/signup.js';
import TextFieldGroup from './common/TextFieldGroup.js';
import { browserHistory } from 'react-router';
import { addFlashMessage } from '../actions/flashMessages.js';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      timezone: '',
      errors: {},
      isLoading: false,
      isvalid: false
    }
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if(!isValid) {
      this.setState({errors});
    }
    return isValid;
  }
  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let { errors } = this.state;
        let isvalid;
        if(res.data.user) {
          errors[field] = `This ${field} not availble`;
          isvalid = true;
        } else {
          errors[field] = '';
          isvalid: false;
        }
        this.setState({ errors, isvalid });
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          browserHistory.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
      console.log(this.state);
    }
  }
  render() {

    const { errors } = this.state;

    const options = Object.keys(timezones).map(key =>
        <option key={timezones[key]} value={timezones[key]}>{key}</option>
    );
    return(
      <div className="container">
        <form className="col-md-offset-4 col-md-4" onSubmit={this.onSubmit.bind(this)}>
          <h1>Join to community!!!</h1>
          <TextFieldGroup
            label="Username"
            field="username"
            checkUserExists={this.checkUserExists.bind(this)}
            error={errors.username}
            onChange={this.onChange.bind(this)}
          />
          <TextFieldGroup
            label="Email"
            field="email"
            error={errors.email}
            onChange={this.onChange.bind(this)}
          />
          <TextFieldGroup
            label="Password"
            field="password"
            checkUserExists={this.checkUserExists.bind(this)}
            error={errors.password}
            onChange={this.onChange.bind(this)}
            type="password"
          />
          <TextFieldGroup
            label="Confirm password"
            field="confirmPassword"
            error={errors.confirmPassword}
            onChange={this.onChange.bind(this)}
            type="password"
          />
          <div className={classnames("form-group", {'has-error': errors.timezone })}>
            <label htmlFor="timezone">Timezone</label>
            <select
              onChange={this.onChange.bind(this)}
              className="form-control"
              id="timezone"
              name="timezone"
            >
              <option value="">Choose your timezone</option>
              {options}
            </select>
            { errors.timezone && <span className="help-block">{errors.timezone}</span> }
          </div>
          <div className="form-group">
            <button
              disabled={this.state.isLoading || this.state.isvalid}
              className="btn btn-primary btn-lg">
              Sign up
            </button>
            { this.state.isLoading && <span className="warning"> Loading...</span> }
          </div>
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}
export default connect(null, { userSignupRequest, isUserExists, addFlashMessage})(Signup);

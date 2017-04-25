import React, { Component } from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({field, label, error, onChange, type}) => {
  return(
    <div className={classnames("form-group", {'has-error': error })}>
      <label htmlFor={field}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        className="form-control"
        name={field}
        id={field}
      />
      { error && <span className="help-block">{error}</span> }
    </div>
  )
}

TextFieldGroup.defaultProps = {
  type: "text"
}

export default TextFieldGroup;

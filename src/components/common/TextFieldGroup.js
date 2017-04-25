import React, { Component } from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({field, label, error, onChange, type, checkUserExists}) => {
  return(
    <div className={classnames("form-group", {'has-error': error })}>
      <label htmlFor={field}>{label}</label>
      <input
        type={type}
        onBlur={checkUserExists}
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

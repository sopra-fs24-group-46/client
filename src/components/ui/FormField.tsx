import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/ui/FormField.scss";

export const FormField = (props) => {
  return (
    <div className="formfield field">
      <label className="formfield label">{props.label}: </label>
      <input
        type={props.type}
        className="formfield input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style = {{width: "50px"}}
      />
    </div>
  );
};

FormField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
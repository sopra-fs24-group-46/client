import React, { useState } from "react";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";

export const FormField = (props) => {
  return (
    <div className="profile field">
      <label className="profile label">{props.label}</label>
      <input
        type={props.type}
        className="profile input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
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
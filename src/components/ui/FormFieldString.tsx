import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/FormFieldString.scss";


export const FormField = (props) => {
  return (
    <div className={`formfieldd field ${props.className}`}>
      <label className={`formfieldd label ${props.className}`}>{props.label} </label>
      <input
        type={props.type}
        className={`formfieldd input ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
        min = {props.min}
        max = {props.max}
        onKeyPress = {props.onKeyPress ?? (() => {}) }
        onBlur = {props.onBlur ?? (() => {}) }
        
      />
    </div>
  );
};

FormField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func

};

export const FormFieldEdit = (props) => {
  return (
    <div className={`formfieldd field ${props.className}`}>
      <label className={`formfieldd label ${props.className}`}>{props.label} </label>
      <input
        type={props.type}
        className={`formfieldd input ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        min = {props.min}
        max = {props.max}
        style={{ color: 'black' }}
      />
    </div>
  );
};

FormFieldEdit.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
}

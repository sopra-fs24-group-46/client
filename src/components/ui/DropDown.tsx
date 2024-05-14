
import React from 'react';
import "../../styles/ui/DropDown.scss";
import PropTypes from 'prop-types';

const Dropdown = ({ elements, hide, onClick, ...props}) => {
  return (
    <div className={hide ? "dropdown hidden" : "dropdown"} style={props.style}>
      <ul>
        {elements.map((element, index) => (
          <li key={index} onClick={() => onClick(element)}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  elements: PropTypes.array.isRequired,
  hide: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default Dropdown;
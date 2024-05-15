import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import "../../styles/ui/MultiSelection.scss";
import Dropdown from './DropDown';

export const MultiSelection = ({ options, onChange, label, defaultValue = [] }) => {
  const [selectedWords, setSelectedWords] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  //close drop down when clicking outside the multi selection
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeDropDown();
      }
      if (ref.current && ref.current.contains(event.target)) {
        openDropDown();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const openDropDown = () => {
    setIsOpen(true);
  }

  const closeDropDown = () => {
    setIsOpen(false);
  };

  const handleWordSelect = (word) => {
    setSelectedWords([...selectedWords, word]);
    onChange([...selectedWords, word]);
  };

  const removeWord = (index) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords.splice(index, 1);
    setSelectedWords(newSelectedWords);
    onChange(newSelectedWords);
  };

  return (
  //ref is needed for detection in drop down closing
  
    <div ref = {ref} className="multi-selection" >
      
        <button className = "button" onClick={toggleDropdown}>
          {label}:
        </button>
        {selectedWords.map((word, index) => (
          <div key={index} className="selected-word">
            {word}
            <span className="remove-word" onClick={() => removeWord(index)}>
              &#10006;
            </span>
          </div>
        ))}
      
      {/* {isOpen && options.filter((option) => !selectedWords.includes(option)).length > 0 && (
        <div className="dropdown" >
        {options.filter((option) => !selectedWords.includes(option))
          .map((option, index) => (
            <div key={index} className="option" onClick={() => handleWordSelect(option)}>
            {option}
            </div>
          ))}
          </div>
        )} */}
    <Dropdown hide={!isOpen} elements={options.filter((option) => !selectedWords.includes(option))} onClick={handleWordSelect} />
    </div>
  
  );
};

MultiSelection.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string,
  defaultValue: PropTypes.array
}
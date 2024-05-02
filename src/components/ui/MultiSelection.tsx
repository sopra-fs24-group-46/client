import React, { useState } from 'react';
import PropTypes from "prop-types";
import "../../styles/ui/MultiSelection.scss";

export const MultiSelection = ({ options, onChange, label}) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
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
    <div className="multi-selection" onMouseLeave={closeDropdown}>
      <div className="field" >
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
      </div>
      {isOpen && options.filter((option) => !selectedWords.includes(option)).length > 0 && (
        <div className="dropdown" >
          {options.filter((option) => !selectedWords.includes(option))
            .map((option, index) => (
            <div key={index} className="option" onClick={() => handleWordSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

MultiSelection.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string
}
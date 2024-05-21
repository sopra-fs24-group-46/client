import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {FormField} from './FormFieldString';
import Dropdown from './DropDown';

const ValidatedTextInput = ({ validStrings, label, onValidString, ...props }) => {
  const distinctValidString: string[] = getDistinctValidStrings(validStrings);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState(distinctValidString);
  const [hide, setHide] = useState(true);
  const [validString, setValidString] = useState(false);
  const [mouseOverDropDown, setMouseOverDropDown] = useState(false);

  const ref = useRef(null);

  const onValidStringFound =(string: string) => {
      setInputText(string ?? inputText);
      setSuggestions([]);
      setValidString(true);
      onValidString(string);
  }

  const handleInputChange = (value) => {
    setHide(false);

    // Filter valid strings that match the input
    const filteredSuggestions = distinctValidString.filter((str) =>
      str.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    if ((filteredSuggestions.length === 1 || filteredSuggestions.length === 0 && validString)
        && inputText.length < value.length) {
      console.log("inputText", inputText, "value", value);
      
      onValidStringFound(filteredSuggestions[0] ?? inputText);
    } else {
      setInputText(value);
      setValidString(false);
      onValidString(null);
    }
  };

  const handleOnBlur = (e) => {
    if (!mouseOverDropDown) {
      setTimeout(() => setHide(true), 5);
    }
  }

  const handleSelectSuggestion = (suggestion) => {
    onValidStringFound(suggestion);
  };
  
  const handleKeyPress = (e) => {
    console.log("key pressed", e.key);
    if (document.activeElement === e.target && e.key === 'Enter') {
    //accept first suggestion or empty string
      onValidStringFound(suggestions.length > 1 && inputText.length > 0 ? suggestions[0] : inputText);
    }
    if (e.key === 'Escape') {
      setHide(true);
    }
  }
  
  const isValidInput = distinctValidString.includes(inputText);

  return (
    <div ref={ref} style ={{ maxWidth: "100vw"}}>
      <FormField
        className="authentication"
        placeholder="Canton or District"
        type="text" value={inputText} onChange={handleInputChange}
        onKeyPress={handleKeyPress} //Enter Key
        isValidInput={isValidInput}
        onBlur={handleOnBlur}
      />
      <div>
        <Dropdown
          hide={suggestions.length <= 1 || hide || inputText.length === 0}
          elements={suggestions} onClick={handleSelectSuggestion} setMouseOver={setMouseOverDropDown}
          style={{ maxHeight: props.dropDownMaxHeight }} />
      </div>
    </div>
  );
};

ValidatedTextInput.propTypes = {
  validStrings: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onValidString: PropTypes.func.isRequired,
  dropDownMaxHeight: PropTypes.string,
}

export default ValidatedTextInput;


const getDistinctValidStrings = (strings: string[]) => {
  return Array.from(new Set(strings));
}
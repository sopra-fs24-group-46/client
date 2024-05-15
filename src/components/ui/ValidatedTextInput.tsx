import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "../../styles/ui/FormField.scss";
import Dropdown from './DropDown';

const ValidatedTextInput = ({ validStrings, label, onValidString, ...props }) => {
  const distinctValidString: string[] = getDistinctValidStrings(validStrings);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState(distinctValidString);
  const [hide, setHide] = useState(true);
  const [validString, setValidString] = useState(false);
  const ref = useRef(null);

  //close drop down when clicking outside the multi selection
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  
  const onValidStringFound =(string: string) => {
      setInputText(string ?? inputText);
      setSuggestions([]);
      setValidString(true);
      onValidString(string);
  }

  const handleInputChange = (e) => {
    setHide(false);

    const value = e.target.value;

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

  const handleSelectSuggestion = (suggestion) => {
    onValidStringFound(suggestion);
  };
  
  const handleKeyPress = (e) => {
    if (document.activeElement === e.target && e.key === 'Enter') {
      onValidStringFound(suggestions.length > 1 ? suggestions[0] : inputText);
    }
    if (e.key === 'Escape') {
      setHide(true);
    }
  }
  
  const isValidInput = distinctValidString.includes(inputText);

  return (
    <div ref={ref} >
      <div className={isValidInput ?"formfield field":"formfield field invalid"}>
        <input
          className = {isValidInput ?"formfield input":"formfield input invalid"}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type something..."
          //pass props
          {...props}
        />
      </div>
      <div>
        <Dropdown hide={suggestions.length <= 1 || hide} elements={suggestions} onClick={handleSelectSuggestion} style={{maxHeight: props.dropDownMaxHeight} } />
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
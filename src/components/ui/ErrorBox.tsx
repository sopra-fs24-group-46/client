import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export interface ErrorBoxProps {
  message: string;
  onClose?: () => void;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ message, onClose = () => {}, }) => {
  const [show, setShow] = useState(true);
  const [closeOnLeave, setCloseOnLeave] = useState(false);
  

  
  const ref = useRef(null);

    useEffect(() => {
    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target) && closeOnLeave) {
              handleClose();
        } 
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [closeOnLeave]);

    useEffect(() => {
      if (message ? message.length > 0 : false) {
          handleShow();
        }
    }, [message]);

  const handleClose = () => {
    setShow(false);
    onClose();
    setCloseOnLeave(false);
  };
  const handleShow = () => {
    setShow(true) 
    setTimeout(() => setCloseOnLeave(true), 500);
  };

  return (
    show && (
      <div
        ref = {ref}
        className="error-box"
        style={{
          position: "fixed",
          top: "1em",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "lightcoral",
          border: "2px solid darkred",
          borderRadius: "0.5em",
          padding: "1em",
          color: "white",
          zIndex: 10,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
      <div>

          {message.split("\n").map((line, index) => <p key={index}>{line}</p>)}
        </div>
        <button
          style={{
                      display: "flex",
                      alignItems: "center",
          justifyContent: "center",
          backgroundColor: "inherit",
          border: "inherit",
            color: "white",
            borderRadius: "1em",
                      height: "1.5em",
                      width: "1.5em",
            padding: "0.5em",
                      cursor: "pointer",
                      position: "absolute",
                      top: "-0.5em",
                      right: "-0.5em",
          }}
          onClick={handleClose}
        >
          <p>
          &#10006;
          </p>
        </button>
      </div>
    )
  );
};

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default ErrorBox;

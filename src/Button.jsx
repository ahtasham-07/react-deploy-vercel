import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ type, onClick, children, size, disabled, className }) => {
  return (
    <button
      className={`button ${size} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  size: 'medium',
  disabled: false,
  className: '',
};

export default Button;

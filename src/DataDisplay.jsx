import React from 'react';
import PropTypes from 'prop-types';
import './DataDisplay.css';

const DataDisplay = ({ title, data, onDelete }) => {
  return (
    <div className="data-display">
      <h2 className="data-display-title">{title}</h2>
      <ul className="data-display-list">
        {data.map((bot, index) => (
          <li key={index} className="data-display-item">
            <span>{bot.name}</span>
            <button
              className="delete-button"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

DataDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DataDisplay;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BotForm.css';

const BotForm = ({ onSubmit }) => {
  const [botName, setBotName] = useState('');
  const [botKey, setBotKey] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('botName', botName);
    formData.append('botKey', botKey);
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append('file', file);
      });
    }
    onSubmit(formData);
  };

  return (
    <form className="bot-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="botName">Name:</label>
        <input
          type="text"
          id="botName"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="botKey">API Key:</label>
        <input
          type="text"
          id="botKey"
          value={botKey}
          onChange={(e) => setBotKey(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="files">Select Files:</label>
        <input
          type="file"
          id="files"
          onChange={(e) => setSelectedFiles(e.target.files)}
          multiple
        />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

BotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BotForm;

import React, { useState, useEffect } from 'react';
import Button from './Button';
import DataDisplay from './DataDisplay';
import Modal from './Modal';
import BotForm from './BotForm';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/bots');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const bots = await response.json();
      setData(bots);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (index) => {
    const botNameToDelete = data[index].name;
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete-bot/${botNameToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('Delete success:', responseData);
      // Refetch the updated data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting bot:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    setIsModalOpen(false);

    try {
      const response = await fetch('http://127.0.0.1:5000/create-bot', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      // Refetch the updated data after form submission
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
      <Button type="button" onClick={handleClick} size="medium" className="top-right-button">
        Add new bot
      </Button>
      <DataDisplay title="Bots" data={data} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BotForm onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default App;

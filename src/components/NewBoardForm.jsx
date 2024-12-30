import './NewBoardForm.css';
import PropTypes from 'prop-types';
import { useState } from 'react';


const NewBoardForm = ({ addBoard }) => {
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title.trim() === '' || formData.owner.trim() === '') {
      alert('Both fields are required!');
      return;
    }
    // Pass new board data to parent or backend
    addBoard(formData);
    setFormData({title: '', owner: ''})
  };

  return (
    <section>
      <h2>Create a New Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
            <input
              type="text"
              id="title"
              name="title" 
              value={formData.title}
              onChange={handleChange}
            />
        </div>
        
        <div>
          <label htmlFor='owner'>Owner&apos;s Name: </label>
            <input 
              type="text"
              id="owner"
              name="owner" 
              value={formData.owner}
              onChange={handleChange}
            />
        </div>
        <input type="submit" value="Submit"/>
      </form>
    </section>
  )
}

NewBoardForm.propTypes = {
  addBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;

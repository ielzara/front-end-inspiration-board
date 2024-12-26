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
          <label>Title:
            <input 
              type="text" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div>
          <label>Owner&apos;s Name:
            <input 
              type="text"
              name="owner" 
              value={formData.owner}
              onChange={handleChange}
            />
          </label>
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

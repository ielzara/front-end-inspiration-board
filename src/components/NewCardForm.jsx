import './NewCardForm.css';
import { useState } from 'react';

const NewCardForm = ({ addCard }) => {

  const [formData, setFormData] = useState({ message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCard(formData);
    setFormData({ message: '' });
  };


  return (
    <section>
      <h2>Add a Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message: </label>
          <input
            type="text"
            id='message'
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </section>
  )
}

export default NewCardForm;

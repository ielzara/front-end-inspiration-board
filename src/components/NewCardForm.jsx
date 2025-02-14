import './NewCardForm.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

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
    <section className='card-form'>
      <h2>Add a Card to Selected Board </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message: </label>
          <input
            type="text"
            id='message'
            name="message"
            placeholder='Max 40 Characters.'
            maxLength='40'
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input className="submit-btn" type="submit" value="Submit"/>
        </div>
      </form>
    </section>
  )
}
NewCardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default NewCardForm;

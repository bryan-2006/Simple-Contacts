import { useState, useEffect } from 'react';

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || '');
  const [lastName, setLastName] = useState(existingContact.lastName || '');
  const [email, setEmail] = useState(existingContact.email || '');

  const updating = Object.keys(existingContact).length !== 0;  // Check if updating or creating a new contact

  const onSubmit = async (e) => {
    e.preventDefault();  // Prevent page refresh

    const data = { firstName, lastName, email };

    const url = `http://127.0.0.1:5000/${updating ? `update_contact/${existingContact.id}` : 'create_contact'}`;
    const options = {
      method: updating ? 'PATCH' : 'POST',  // Use PATCH for updating, POST for creating
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const message = await response.json();
      alert(message.message);
    } else {
      updateCallback();  // Trigger callback to refresh contacts
    }
  };

  useEffect(() => {
    setFirstName(existingContact.firstName || '');
    setLastName(existingContact.lastName || '');
    setEmail(existingContact.email || '');
  }, [existingContact]);  // Reset form fields when switching between editing/creating

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='firstName'>First Name: </label>
        <input
          type='text'
          id='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name: </label>
        <input
          type='text'
          id='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit'>{updating ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ContactForm;

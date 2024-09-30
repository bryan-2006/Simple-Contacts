import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import './App.css';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();  // Fetch contacts when the component mounts
  }, []);

  // Fetch contacts from the backend
  const fetchContacts = async () => {
    const response = await fetch('http://127.0.0.1:5000/contacts');
    const data = await response.json();
    setContacts(data.contacts);  // Update the state with fetched contacts
  };

  // Close the modal and reset the current contact
  const closeModel = () => {
    setIsModelOpen(false);
    setCurrentContact({});
  };

  // Open the modal for creating a new contact
  const openCreateModel = () => {
    if (!isModelOpen) setIsModelOpen(true);
  };

  // Open the modal for editing an existing contact
  const openEditModel = (contact) => {
    if (isModelOpen) return;
    setCurrentContact(contact);
    setIsModelOpen(true);
  };

  // Update contact list and close the modal
  const onUpdate = () => {
    closeModel();
    fetchContacts();  // Fetch updated contacts after creating or updating
  };

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModel} updateCallback={onUpdate} />
      <button onClick={openCreateModel}>Create Contact</button>
      {isModelOpen && (
        <div className='model'>
          <div className='model-content'>
            <span className='close' onClick={closeModel}>
              &times;
            </span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    //fetchContacts()
  }, [])  // Added empty dependency array to prevent continuous fetching

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)  // Now using setContacts to update the state
    console.log(data.contacts)
  }

  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm/>
    </>)
}

export default App

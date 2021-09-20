import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      setContacts(response.data);
    });
  }, []);

  const submit = () => {
    axios.post("http://localhost:3001/api/insert", {name, email}); 

    setContacts([...contacts, {name, email}]);
  };

  const deleteContact = (name) => {
    axios.delete(`http://localhost:3001/api/delete/${name}`);
    window.location.reload(false);
  };

  const updateContact = (name) => {
    axios.put("http://localhost:3001/api/update", {
      name: name,
      email: newEmail
    });
    setNewEmail("");
    window.location.reload(false);
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      
      <div className="form">
        <label>Name:</label>
        <input type="text" name="name" onChange={(e) => {
          setName(e.target.value)
        }} />
        <label>Email:</label>
        <input type="text" name="email" onChange={(e) => {
          setEmail(e.target.value)
        }} />

        <button onClick={submit}>Submit</button>

        {contacts.map((val) => {
          return (
            <div className="card">
              <h1>{val.name}</h1>
              <p>{val.email}</p>

              <button onClick={() => {deleteContact(val.name)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewEmail(e.target.value);
              }} />
              <button onClick={() => {updateContact(val.name)}}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

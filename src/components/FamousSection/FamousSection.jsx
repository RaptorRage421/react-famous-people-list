import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(()=>{fetchPeople()},[])
  
  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios.get('/api/people/')
    .then((response)=>{
      setPeopleArray(response.data)
      console.log("Famous People: ", response.data)
    })
    .catch((err)=>{
      console.error("Error in GET /api/people", err)
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
    axios.post('/api/people/', { name: famousPersonName, role: famousPersonRole })
    .then(() => {
      // Refresh famous people list after successful POST request
      fetchPeople();
      // Clear input fields
      setPersonName('');
      setPersonRole('');
    })
    .catch((err) => {
      console.error("Error in POST /api/people", err);
    });

  }

 

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} value={famousPersonName}/>
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} value={famousPersonRole}/>
          <button type="submit">Done</button>
        </form>
        <p>
          <b>{famousPersonName}</b> is famous for <b>"{famousPersonRole}"</b>.
        </p>
        <ul>
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map((person)=>{
            return (<li key={person.id}><b>{person.name}</b> is famous for <b>{person.role}</b></li>)
          })}
        </ul>
      </section>
    );
}

export default FamousSection;

import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  }, []);

  const showPersons = filterName
    ? persons.filter((person) => {
        return person.name.toLowerCase().includes(filterName.toLowerCase());
      })
    : persons;

  const handleNameChange = (event) => {
    const { value } = event.target;

    setNewName(value);
  };

  const handleNumberChange = (event) => {
    const { value } = event.target;

    setNewNumber(value);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;

    setFilterName(value);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredName={filterName} onChange={handleFilterChange} />
      <PersonForm
        onChange={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons personData={showPersons} />
    </div>
  );
};

export default App;

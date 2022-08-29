import { useState, useEffect } from 'react';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
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

    personService.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
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

import { useState, useEffect } from 'react';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });

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

  const hideNotification = (visibleSeconds) => {
    return setTimeout(() => {
      setNotification({
        message: '',
        type: '',
      });
    }, 1000 * visibleSeconds);
  };

  const handleNumberChange = (event) => {
    const { value } = event.target;

    setNewNumber(value);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;

    setFilterName(value);
  };

  const deletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    const { name } = deletedPerson;
    const confirmation = window.confirm(`Delete ${name}?`);

    if (!confirmation) return;

    const remainingPersons = persons.filter((person) => person.id !== id);

    personService.deletePerson(id).then((status) => {
      setPersons(remainingPersons);
      if (status === 200) {
        setNotification({
          message: `${name} was deleted from the phonebook!`,
          type: 'success',
        });
        hideNotification(5);
      }
    });
  };

  const addName = (event) => {
    event.preventDefault();

    const existingName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingName) {
      if (existingName && existingName.number === newNumber) {
        setNotification({
          message: `${newName} with the same number is already in your phonebook!`,
          type: 'error',
        });
        hideNotification(5);
        return;
      } else if (existingName.number !== newNumber) {
        const confirmation = window.confirm(
          `${newName} is already added to phonebook and you have typed a new number for this person. Want to change the number?`
        );
        if (!confirmation) return;

        const { id, name } = existingName;

        const updatedPerson = { ...existingName, number: newNumber };

        const newPersons = persons.map((person) => {
          if (person.id === id) {
            return {
              ...person,
              number: newNumber,
            };
          } else {
            return person;
          }
        });

        personService
          .updatePerson(id, updatedPerson)
          .then((status) => {
            if (status === 200) {
              setPersons(newPersons);
              setNotification({
                message: `${name}'s phone number successfully updated!`,
                type: 'success',
              });
              setNewName('');
              setNewNumber('');
              hideNotification(5);
            }
          })
          .catch((error) => {
            if (error.code === 'ERR_BAD_REQUEST') {
              setNotification({
                message: `${name} has already been removed from the phonebook!`,
                type: 'error',
              });
              hideNotification(5);
            }
          });
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNotification({
        message: `Added ${newName}`,
        type: 'success',
      });
      hideNotification(5);
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filteredName={filterName} onChange={handleFilterChange} />
      <PersonForm
        onChange={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons personData={showPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

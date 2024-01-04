import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddPerson from './components/AddPerson';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPersonsData = async () => {
    const persons = await personService.getAllPersons();
    setPersons(persons);
  };

  useEffect(() => {
    fetchPersonsData();
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSTChange = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (existingPerson && existingPerson.number !== newNumber) {
      const confirmedNumberUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmedNumberUpdate) {
        await personService.updatePerson(existingPerson.id, {
          ...existingPerson,
          number: newNumber
        });
        const updatedPersonsList = persons.map(person => {
          if (person.id === existingPerson.id) {
            return {
              ...person,
              number: newNumber
            }
          } else {
            return person
          }
        })
        setPersons(updatedPersonsList)
        setNewName('');
        setNewNumber('');
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      await personService.addPerson(newPerson);

      const newNames = [...persons, newPerson];

      setPersons(newNames);
      setNewName('');
      setNewNumber('');
    }
  };

  const handlePersonDelete = async (person) => {
    const hasConfirmedDeletion = window.confirm(
      `Do you want to delete ${person.name} from the phonebook?`
    );

    if (hasConfirmedDeletion) {
      await personService.deletePerson(person.id);
      fetchPersonsData();
    }
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSTChange={handleSTChange} />
      <h3>add a new</h3>
      <AddPerson
        newName={newName}
        handleNameChange={handleNameChange}
        handleNameSubmit={handleNameSubmit}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        filteredNames={filteredNames}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;

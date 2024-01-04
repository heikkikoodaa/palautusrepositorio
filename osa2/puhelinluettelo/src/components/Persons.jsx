import Person from './Person';

const Persons = ({ filteredNames, handlePersonDelete }) => {
  return (
    <ul>
      {filteredNames.map((person) => (
        <Person
          key={person.name}
          person={person}
          handlePersonDelete={handlePersonDelete}
        />
      ))}
    </ul>
  );
};

export default Persons;

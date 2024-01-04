const Person = ({ person, handlePersonDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handlePersonDelete(person)}>delete</button>
    </li>
  );
};

export default Person;

const AddPerson = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleNameSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit' onClick={handleNameSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default AddPerson;

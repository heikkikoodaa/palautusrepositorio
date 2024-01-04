const Filter = ({ searchTerm, handleSTChange }) => {
  return (
    <div>
      <p>Filter phonebook results searching by a name</p>
      <input value={searchTerm} onChange={handleSTChange} />
    </div>
  )
}

export default Filter
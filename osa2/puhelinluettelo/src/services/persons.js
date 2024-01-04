import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const addPerson = async (newPerson) => {
  await axios.post(baseUrl, newPerson)
}

const deletePerson = async (personId) => {
  await axios.delete(`${baseUrl}/${personId}`)
}

const updatePerson = async (personId, newPersonData) => {
  await axios.put(`${baseUrl}/${personId}`, newPersonData)
}

export default {
  addPerson,
  deletePerson,
  getAllPersons,
  updatePerson
}
import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => {
    return response.data;
  });
};

const updatePerson = (id, updatedPersonData) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPersonData);
  return request.then((response) => {
    return response.status;
  });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    return response.status;
  });
};

export default {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};

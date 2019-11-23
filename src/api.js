import axios from 'axios';

const SERVER = 'http://localhost:3000/todos';

const api = {
  getList: () => axios.get(SERVER),
  patch: (id, params) => axios.patch(`${SERVER}/${id}`, params),
  post: (params) => axios.post(`${SERVER}`, params),
  delete: (id) => axios.delete(`${SERVER}/${id}`)
}

export default api;
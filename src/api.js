import axios from 'axios';

const SERVER = 'http://localhost:3000/todos';

const api = {
  getList: () => axios.get(SERVER),
  patch: (id, params) => axios.patch(`${SERVER}/${id}`, params)
}

export default api;
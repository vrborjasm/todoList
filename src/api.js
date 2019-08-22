import axios from 'axios';

const SERVER = 'https://my-json-server.typicode.com/vrborjasm/todoList/todos';

const api = {
  getList: () => axios.get(SERVER),
  patch: (id, params) => axios.patch(`${SERVER}/${id}`, params),
  post: (params) => axios.post(`${SERVER}`, params)
}

export default api;
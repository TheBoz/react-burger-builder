import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-68857.firebaseio.com/'
});

export default instance;
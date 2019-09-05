import axios from 'axios';
import * as firebaseConfig from './shared/firebaseConfig';

const instance = axios.create({
  baseURL: firebaseConfig.BASE_URL
});

export default instance;
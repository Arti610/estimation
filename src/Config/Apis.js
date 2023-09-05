import axios from 'axios';
import { baseURL } from './Config';


const api = axios.create({
  baseURL: baseURL, // Replace with your base URL
  // Other default configuration options can be added here
});

// const ImgApi = axios.create({
//   imgURL : ImgUrl
// })
// export {ImgApi}
export default api;

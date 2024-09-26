import axios from 'axios';
// https://latheefadmin.zybotech.in/
const customAxios = axios.create({
  baseURL: 'https://admin.latheefwatch.com',
  timeout: 10000,
});

export default customAxios;

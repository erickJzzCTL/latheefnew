import axios from "axios";

const customAxios = axios.create({
    baseURL: "http://192.168.29.245:8000/",
    timeout: 10000,
});


export  default customAxios
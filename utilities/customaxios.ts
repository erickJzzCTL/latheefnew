import axios from "axios";

const customAxios = axios.create({
    baseURL: "https://latheefadmin.zybotech.in/",
    timeout: 10000,
});


export  default customAxios
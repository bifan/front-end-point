import axios from "axios";

axios.defaults.baseURL = "http://localhost:2001";

export const getFileNames = () => axios.get("/getFileNames");

import axios from "axios";

const url = "https://moveo-interview.herokuapp.com/api/code/";

const getAllBlocks = () => {
  return axios.get(url);
};

const getBlockById = (id) => {
  return axios.get(url + id);
};

const addNewBlock = (obj) => {
  return axios.post(url, obj);
};

export default { getAllBlocks, addNewBlock, getBlockById };

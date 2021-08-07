import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_SERVER_URL,
};

export default function createAxiosInstance() {
  return axios.create(config);
}

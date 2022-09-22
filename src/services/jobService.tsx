import axios from "axios";
import { jobDataDto } from "../dto/jobData.dto";

class JobService {
  async create(data: jobDataDto) {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "job/create",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: { Accept: "application/json", Authorization: "Bearer " + token },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async findAll() {
    return axios({
      url: process.env.REACT_APP_API_URL + "job/findAll",
      method: "GET",
      timeout: 5000,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        return (await Promise.resolve(response)).data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async findOne(id: string | undefined) {
    return axios({
      url: process.env.REACT_APP_API_URL + `job/${id}`,
      method: "GET",
      timeout: 5000,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        return (await Promise.resolve(response)).data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async findAllByUser() {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "job/findAllByUser",
      method: "GET",
      timeout: 5000,
      headers: { Accept: "application/json", Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        return (await Promise.resolve(response)).data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async remove(id: string) {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + `job/${id}`,
      method: "DELETE",
      timeout: 5000,
      headers: { Accept: "application/json", Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        return (await Promise.resolve(response)).data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const jobService = new JobService();

export default jobService;

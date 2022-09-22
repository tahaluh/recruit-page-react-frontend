import axios from "axios";
import { access } from "fs";
import { companyDataDto } from "../dto/companyData.dto";

class CompanysService {
  async create(data: companyDataDto) {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "company/create",
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

  async getCompany() {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "company/findByUser",
      method: "POST",
      timeout: 5000,
      headers: { Accept: "application/json", Authorization: "Bearer " + token },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  async update(data: companyDataDto) {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "company/update",
      method: "PATCH",
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
}

const companyService = new CompanysService();

export default companyService;

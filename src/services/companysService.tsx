import axios from "axios";
import { access } from "fs";
import { companyDataDto } from "../dto/companyData.dto";

class CompanysService {
  async create(data: companyDataDto) {
    return axios({
      url: process.env.REACT_APP_API_URL + "company/create",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: { Accept: "application/json" },
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

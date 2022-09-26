import axios from "axios";
import { cepDataDto } from "../dto/cepData.dto";

class IsLogedService {
  async isLoged() {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "token/verify",
      method: "GET",
      timeout: 5000,
      headers: { Accept: "application/json", Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        if (response.data.status) {
          console.log(response.data)
          return true;
        }
        await localStorage.removeItem("TOKEN");
        return false;
      })
      .catch((error) => {
        return false;
      });
  }
}

const isLogedService = new IsLogedService();

export default isLogedService;

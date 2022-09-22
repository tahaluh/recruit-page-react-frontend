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
            if(!response.data.status){
                await localStorage.removeItem("TOKEN")
                return false
            }
            return true;
          })
          .catch((error) => {
            return error;
          });
      }
}

const isLogedService = new IsLogedService();

export default isLogedService;

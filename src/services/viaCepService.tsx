import axios from "axios";
import { cepDataDto } from "../dto/cepData.dto";

class ViaCepApi {
  async get(data: cepDataDto) {
    return axios({
      url: `https://viacep.com.br/ws/${data.cep}/json/`,
      method: "GET",
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

const viaCepApiService = new ViaCepApi();

export default viaCepApiService;

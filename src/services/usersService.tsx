import axios from "axios";
import { access } from "fs";
import { userDataDto } from "../dto/userData.dto";
import { userDataTokenDto } from "../dto/userDataToken.dto";

class UserService {
  async create(data: userDataDto) {
    return axios({
      url: process.env.REACT_APP_API_URL + "user/create",
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

  async login(data: userDataDto) {
    return axios({
      url: process.env.REACT_APP_API_URL + "user/login",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (typeof response == "object" && response.data.access_token) {
          localStorage.setItem("TOKEN", response.data.access_token);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async tokenLogin(data: userDataTokenDto) {
    return axios({
      url: process.env.REACT_APP_API_URL + "user/login-token",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (typeof response == "object" && response.data.access_token) {
          localStorage.setItem("TOKEN", response.data.access_token);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async update(data: userDataDto) {
    let token = await localStorage.getItem("TOKEN");
    return axios({
      url: process.env.REACT_APP_API_URL + "user/update",
      method: "PATCH",
      timeout: 5000,
      data: data,
      headers: { Accept: "application/json", Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.data.status === true) {
          let token = response.data.access_token;
          if (token) {
            localStorage.setItem("TOKEN", token);
          }
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const userService = new UserService();
export default userService;

import axios from "axios";
import { userDataDto } from "../dto/userData.dto";

class UserService {
    async create(data: userDataDto){        
        return axios({
            url: process.env.REACT_APP_API_URL + "/user/create",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {Accept: 'application/json'}
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async login(data: userDataDto){        
        return axios({
            url: process.env.REACT_APP_API_URL + "/user/login",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {Accept: 'application/json'}
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

const userService = new UserService()
export default userService;

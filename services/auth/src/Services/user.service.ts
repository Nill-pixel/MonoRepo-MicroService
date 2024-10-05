import axios from "axios";
import { sigUpType } from "../types/auth.interface";

export class UserService {

  async register(userData: sigUpType) {
    return await axios.post('http://localhost:3001/user/register', userData).then((response) => {
      if (response.data) {
        return response.data
      }
      return null
    }).catch((error) => {
      return error
    })
  }

  async findOne(email: string) {
    return await axios.post('http://localhost:3001/user/findUser', { email }).then((response) => {
      console.log("usuarios encontrado : ", response.data)
      return response.data
    }).catch((error) => {
      return null
    })
  }

}
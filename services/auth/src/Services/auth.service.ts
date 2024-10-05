import axios from "axios";
import { sigInType, userData } from "../types/auth.interface";
import jwt from "jsonwebtoken";

export class AuthService {

  async verifyUser(userData: sigInType, userFound: sigInType) {
    const storedPass = userFound.password
    const inputPass = userData.password
    const isMatch = await axios.post('http://localhost:3001/user/verifyPass', { inputPass, storedPass }).then((response) => {
      console.log(response.data)
      return response.data
    }).catch((error) => {
      console.log(error)
    })

    if (userData.email === userData.email && isMatch === true)
      return true
    else
      return false
  }

  async createJWT(userData: userData) {
    const payload = {
      role: "USER",
      email: userData.email,
      name: userData.name
    }
    const token = jwt.sign(payload, process.env.ULTRA_SECRET || 'ultra***', {
      expiresIn: 3600
    })
    return token
  }
}
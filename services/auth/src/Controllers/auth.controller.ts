import axios from "axios";
import { AuthService } from "../Services/auth.service";
import { sigInType, sigUpType } from "../types/auth.interface";
import { UserService } from "../Services/user.service";
import { LogLevel } from "../enum/log.level.enum";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  async register(userData: sigUpType) {
    const existingUser = await this.userService.findOne(userData.email)
    if (existingUser) {

      this.authService.sendLog(LogLevel.ERROR, "Usuario  já registrado", { error: existingUser })

      axios.post('http://localhost:3003/log/save', "Usuario  já registrado").then(() => {
        console.log("Usuario  já registrado")
      }).catch((error) => { error: error })

      return { message: "Usuario já registrado", status: 409 }
    }

    const newUser = await this.userService.register(userData)
    this.authService.sendLog(LogLevel.INFO, "Usuário registrado com sucesso", { message: newUser })
    return { message: "Usuário registrado com sucesso", user: newUser, status: 201 }
  }

  async signIn(userData: sigInType) {
    const userFound = await this.userService.findOne(userData.email)
    if (!userFound) {
      this.authService.sendLog(LogLevel.ERROR, "Usuário não encontrado", { error: userData })
      return { message: "Usuário não encontrado" }
    }
    const userVerified = await this.authService.verifyUser(userData, userFound)
    if (userVerified) {
      const jwtToken = this.authService.createJWT(userFound)
      this.authService.sendLog(LogLevel.INFO, "login", { token: jwtToken })
      return jwtToken
    } else {
      this.authService.sendLog(LogLevel.ERROR, "Password errada!", { token: userFound })
      return { message: "Password errada!" }
    }
  }
}
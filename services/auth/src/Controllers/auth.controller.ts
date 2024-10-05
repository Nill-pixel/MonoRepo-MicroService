import axios from "axios";
import { AuthService } from "../Services/auth.service";
import { sigInType, sigUpType } from "../types/auth.interface";
import { UserService } from "../Services/user.service";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  async register(userData: sigUpType) {
    const existingUser = await this.userService.findOne(userData.email)
    if (existingUser) {
      return { message: "Usuario já registrado", status: 409 }
    }

    const newUser = await this.userService.register(userData)

    return { message: "Usuário registrado com sucesso", user: newUser, status: 201 }
  }

  async signIn(userData: sigInType) {
    const userFound = await this.userService.findOne(userData.email)
    const userVerified = await this.authService.verifyUser(userData, userFound)
    if (userVerified) {
      const jwtToken = this.authService.createJWT(userFound)
      return jwtToken
    } else {
      return { message: "Usuário não verificado" }
    }
  }
}
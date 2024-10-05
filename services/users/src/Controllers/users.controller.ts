import { UsersService } from "../Services/users.service";
import { userType } from "../types/user.interface";

export class UserController {
  constructor(private readonly userService: UsersService) { }

  async register(userData: userType) {
    return await this.userService.register(userData)
  }
  async findOne(email: string) {
    return await this.userService.findOne(email)
  }
  async verifyPass(inputPass: string, storedPass: string) {
    return await this.userService.verifyPass(inputPass, storedPass)
  }
}
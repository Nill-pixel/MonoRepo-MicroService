import { PrismaClient } from "@prisma/client";
import { userType } from "../types/user.interface";
import bcrypt from 'bcrypt'
export class UsersService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async register(dataUser: userType) {

    const hashedPass = await bcrypt.hash(dataUser.password, 10)

    return await this.prisma.user.create({
      data: {
        name: dataUser.name,
        email: dataUser.email,
        password: hashedPass
      }
    })
  }

  async findOne(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
  }

  async verifyPass(inputPass: string, storedPass: string) {
    const isMatch = await bcrypt.compare(inputPass, storedPass)
    return isMatch
  }
}
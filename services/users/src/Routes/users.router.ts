import { Request, Response, Router, NextFunction } from "express";
import { UserController } from "../Controllers/users.controller";
import { UsersService } from "../Services/users.service";
import { userType } from "../types/user.interface";

export class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    // Instancia o Router do Express e o UserController com UsersService
    this.router = Router();
    const userService = new UsersService();
    this.userController = new UserController(userService);

    // Chama o método para inicializar as rotas
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Define as rotas e as vincula com seus métodos do controller
    this.router.post('/findUser', this.findUser.bind(this));
    this.router.post('/register', this.registerUser.bind(this));
    this.router.post('/verifyPass', this.verifyPass.bind(this))
  }

  // Rota para buscar um usuário
  private async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dataUser = req.body;
      const user = await this.userController.findOne(dataUser.email);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  // Rota para registrar um novo usuário
  private async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dataUser: userType = req.body;
      const newUser = await this.userController.register(dataUser);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  private async verifyPass(req: Request, res: Response, next: NextFunction) {
    try {
      const { inputPass, storedPass } = req.body
      const isMatch = await this.userController.verifyPass(inputPass, storedPass)
      res.status(201).json(isMatch)
    } catch (error) {
      next(error)
    }
  }
}

import { Request, Response, Router } from 'express';
import { UserService } from '../service/user.service';
import { AuthController } from '../controller/auth.controller';
import { Database } from '../data-source';
import { User } from '../db';
import { userRepository } from '../repo/user.repository'; // Import UserRepository class
import { AuthService } from '../service/auth.service';

const userRouter = Router();

const userRepo = new userRepository(Database.getRepository(User));
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

userRouter.post('/register', async (req: Request, res: Response) => {
    await authController.register(req, res);
});
userRouter.post('/login', async (req: Request, res: Response) => {
    await authController.login(req, res);
});
userRouter.post('/logout/:userId', async(req: Request, res: Response) => {
    await authController.logout(req, res)
})
userRouter.post("/refreshToken", async(req: Request, res: Response) => {
    await authController.refreshToken(req, res)
})

export default userRouter;


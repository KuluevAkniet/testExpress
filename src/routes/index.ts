import { Router, Request, Response } from "express";
import router from "./user.routes";


const AppRouter: Router = Router();

// Set up API routes
AppRouter.get('/healthCheck', (req: Request, res: Response) => { res.sendStatus(200); });

AppRouter.use('/register', router);

export default AppRouter;
import { User } from "../db";
import { CreateUserDto } from "../dto/User-Create.dto";
import { loginDto } from "../dto/login.dto";
import { AuthService } from "../service/auth.service";
import { Request, Response } from "express";

export class AuthController {
  service: AuthService;
   constructor(service: AuthService) {
    this.service = service;
   }

  async register(req: Request, res: Response){
    const userData: CreateUserDto =  req.body;
    const newUSer = await this.service.register(userData, res)
    
    res.status(200).json(newUSer)
  }

  async login(req: Request, res: Response) {
    try {
      const userDto: loginDto = req.body;
      const loginUser = await this.service.login(userDto); 
      res.status(200).json(loginUser);
    } catch (error) {
      console.error(' Login error:', error);
      res.status(500).json({ error: 'Login error' });
    }
  }

  async logout(req: Request, res: Response){
    try{
      const userId = req.params.userId;
      if(userId){
        await this.service.logout(parseInt(userId)) ;
        res.json({ message: "You have successfully logged out" }); 
      } else {
        res.status(400).json({ error: "User ID is not specified" }); 
      }
    } catch(e) {
      console.error("Error when logging out:", e);
      res.status(500).json({ error: "Error when logging out" }); 
    }
  }
  

  async refreshToken(req: Request, res: Response){
    try {
      const refreshToken = req.params;
      const refresh = await this.service.refreshToken(refreshToken);
      res.json(refresh); 
    } catch (error) {
      console.error('Error updating token:', error);
      res.status(500).json({ error: 'Error updating token' });
    }
  }

}
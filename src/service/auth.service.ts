import { CreateUserDto } from "../dto/User-Create.dto";
import { loginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refreshTokenDto.dto"
import { userRepository } from "../repo/user.repository";
import { encryptPassword } from "../utills/encrypt-password";
import { Response } from 'express';
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utills/generate-token";
import { decode } from "jsonwebtoken";
import { User } from "../db";
generateRefreshToken
generateAccessToken
encryptPassword

export class AuthService {
 private readonly userRepository: userRepository; 
  constructor(userRepository: userRepository) {
     this.userRepository = userRepository 
  }

  async register(dto: CreateUserDto, res: Response) {
    try {
        const exitUser = await this.userRepository.findOneByName(dto.name);
        if (exitUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        const hashPassword = await encryptPassword(dto.password);
        const newUser = { ...dto, password: hashPassword };

        const createdUser = await this.userRepository.create(newUser);

        return createdUser;
    } catch (error:any) {
        throw new Error('Ошибка при регистрации пользователя: ' + error.message);
    }
  }

  async login(dto: loginDto) {
    try {
        const user = await this.userRepository.findOneByEmail(dto.email);
        if (!user || !bcrypt.compareSync(dto.password, user.password)) {
            return {
                success: false,
                error: 'Неверный логин или пароль',
            };
        }
        
        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({ email: user.email });
        
        user.refreshToken = refreshToken;
        await this.userRepository.create(user);

        return {
            success: true,
            accessToken,
            refreshToken
        };
    } catch (error) {
        console.error('Ошибка входа в систему:', error);
        throw new Error('Ошибка входа в систему');
    }
  }

  async logout(userId: number){
    try{
      const user = await this.userRepository.findOne(userId)
      if (user) {
        user.refreshToken = ''; 
        await this.userRepository.create(user); 
      }
    }catch(e){
      throw new Error("Ошибка при выходе из системы")
    }
  }

  async refreshToken(refreshToken: any){
    try{
      const decodedToken = decode(refreshToken) as { email: string }
      const user = await this.userRepository.findOneByEmail({where: {email: decodedToken.email}});
      if ( user && decodedToken.email && user.email === decodedToken.email ) {
      const accessToken = generateAccessToken({ id: user.id });
      const newRefreshToken = generateRefreshToken({ email: user.email });
      user.refreshToken = newRefreshToken
      await this.userRepository.create(user);
      return { accessToken, newRefreshToken };
    } else {
       throw new Error("Unauthorized! Please log in again");
    }
    }catch(e){
       throw new Error("Error to update token")  
    }
  }
}
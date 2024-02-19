import { Http2ServerRequest } from "http2";
import { userRepository } from "../repo/user.repository"; 
import { CreateUserDto } from "../dto/User-Create.dto";

export class UserService {
    private readonly userRepository: userRepository; 
    constructor(userRepository: userRepository){ 
        this.userRepository = userRepository; 
    }

    async findOne(id: number) {
        try{
           return await this.userRepository.findOne(id);
        }catch(e){
            throw new Error("Нету такого пользователя")
        }
    }

    async findOneByName(name: string){
        try{
            return await this.userRepository.findOneByName(name)
        }catch(e){
            throw new Error("Нету такого пользователя")
        }
    }

    async create(dto: CreateUserDto){
       try{
          return await this.userRepository.create(dto)
       }catch(e){
          throw new Error("Error create user")
       }
    }
}
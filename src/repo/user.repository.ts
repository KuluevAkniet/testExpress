import { Repository } from "typeorm";
import { User } from "../db/entity/user.entity";

export class userRepository {
    userRepository: Repository<User>;
    constructor(repository: Repository<User>) {
        this.userRepository = repository;
    }

    async findOne(id: number){
        try{
           return await this.userRepository.findOne({where: {id: id}})  
        }catch(e){
            throw new Error("Error")
        }
    }

    async findOneByName(name: string){
        try {
          return await this.userRepository.findOne({ where: { name } });
        } catch (error) {
          console.error('Error finding user by name:', error);
          throw new Error('Error finding user by name');
        }
    }

    async findOneByEmail(email: any){
        try {
          return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
          console.error('Error finding user by email:', error);
          throw new Error('Error finding user by email');
        }
    }

    async create(data: any){
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user)
    }
   
}
import { Repository } from "typeorm";
import { File } from "../db/entity/file.entitty";

export class fileRepository {
    fileRepository: Repository<File>
    constructor(repository: Repository<File>){
      this.fileRepository = repository
    }

    async create(data: any){
        const file = this.fileRepository.create(data)
        return await this.fileRepository.save(file)
    }

    async findOneByName(criteria: any){
      return await this.fileRepository.findOne({where:criteria})
    }

    async findAll(){
      return await this.fileRepository.find()
    }

    async update(criteria: any, data:any){
      try {
        const result = await this.fileRepository.update(criteria, data);
        if (result.affected === 0) {
            throw new Error('No records were updated');
        }
        return result;
      } catch (error) {
        console.error('Error updating record:', error);
        throw new Error('Error updating record');
      }
    }

    async deleteOne(criteria: any){
      return await this.fileRepository.delete(criteria)
    }
}
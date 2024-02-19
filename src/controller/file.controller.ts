import { CreateFileDto } from "../dto/File-Create.dto";
import { FileService } from "../service/file.service";
import { Request, Response } from 'express';

export class fileController {
    service: FileService;
    constructor(service: FileService) {
     this.service = service;
    }

    async createFile(req: Request, res: Response) {
        try {
            const dto: CreateFileDto = req.body; 
            await this.service.saveFile(req.file as any,req, res, dto); 
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            await this.service.findOne(req, res); 
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            await this.service.findAll(req, res); 
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async updateFile(req: Request, res: Response) {
        try {
            await this.service.updateFile(req, res); 
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteOne(req: Request, res: Response) {
        try {
            await this.service.deleteOne(req, res); 
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
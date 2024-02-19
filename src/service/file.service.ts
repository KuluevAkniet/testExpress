import { addAbortListener } from 'events';
import { File as FileEntity } from '../db/entity/file.entitty'; // Переименуйте File в FileEntity, чтобы избежать конфликта с встроенным типом
import { CreateFileDto } from '../dto/File-Create.dto';
import storage from '../lib/cloudinary';
import { fileRepository } from '../repo/file.repository';
import { Request, Response } from 'express';
import multer from 'multer';
import { UpdateFile } from '../dto/update-file.dto';

export class FileService {
    private upload = multer({ storage }); 
    private readonly fileRepo: fileRepository;

    constructor(fileRepo: fileRepository){
        this.fileRepo = fileRepo;
    }
    
    async saveFile(data: Express.Multer.File, req: Request, res: Response, dto: CreateFileDto) {
        try {
            this.upload.single('file')(req, res, (err: any) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }
                const file = data
                dto.extension = file.originalname
                dto.mime_type = file.mimetype
                dto.name = dto.name
                dto.size = dto.size
                this.fileRepo.create(dto)
                res.status(201).json({ message: 'File uploaded successfully' });
                
            });
            console.log('File saved to database:', data);
        } catch (error) {
            console.error('Error saving file to database:', error);
            throw new Error('Error saving file to database');
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const file = await this.fileRepo.findOneByName(name);
            if (file) {
                res.status(200).json(file);
            } else {
                res.status(400).json({ error: 'File not found' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const files = await this.fileRepo.findAll();
            if (files.length > 0) {
                res.status(200).json(files);
            } else {
                res.status(404).json({ error: 'No files found in the database' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async updateFile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dto: UpdateFile = req.body;
            const updatedFile = await this.fileRepo.update(dto, parseInt(id));
            res.status(200).json(updatedFile);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.fileRepo.deleteOne(parseInt(id));
            res.status(204).end();
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}



import { Router } from 'express';
import { FileService } from '../service/file.service';
import { fileController } from '../controller/file.controller'; 
import { fileRepository } from '../repo/file.repository'; 
import { Database } from '../data-source';
import { File } from '../db/entity/file.entitty';

const router = Router();
const fileRepo = new fileRepository(Database.getRepository(File)); 
const fileService = new FileService(fileRepo);
const fileControl = new fileController(fileService); 

router.post('/add', async (req, res) => {
    await fileControl.createFile(req, res); 
});

router.get('/findOne/:name', async (req, res) => { 
    await fileControl.findOne(req, res); 
});

router.get('/findAll', async (req, res) => { 
    await fileControl.findAll(req, res); 
});

router.put('/update/:id', async (req, res) => { 
    await fileControl.updateFile(req, res); 
});

router.delete('/delete/:id', async (req, res) => { 
    await fileControl.deleteOne(req, res); 
});

export default router;






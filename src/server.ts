import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { initializeDatabase } from "./data-source";
import userRouter from "./routes/user.routes";
import router from "./routes/file.router";

export const startServer = async () => {
    await initializeDatabase();
    const app: express.Application = express(); 

    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/v1/', userRouter);
    app.use('/api/v2/', router);

    const host: any = process.env|| 'localhost'
    const port: number = parseInt(process.env.PORT || '3000')

    app.listen(port, host, () => {
        console.log(`Server running on http://localhost:${port} in ${process.env.NODE_ENV} mode...`);
    });
    
}
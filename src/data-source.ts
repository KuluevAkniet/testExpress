import { join } from "path";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./db/entity/user.entity";
import { File } from "./db/entity/file.entitty";

export const Database = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [User, File],
    migrations: [join(__dirname, 'migrations/*{.ts, .js}')],
    subscribers: [],
})

export async function initializeDatabase(): Promise<DataSource> {
    try {
        const db = await Database.initialize();
        console.log(`Database (${db.options.database}) connected successfully...`);
        return db;
    } catch (error) {
        console.error('Database connection failed...');
        console.error(error);
        console.log('Aborting application...');
        process.exit(1);
    }
}
  
console.log(__dirname);
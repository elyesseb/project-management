import { Client } from 'pg';
import client from './dbConfig';

export const createDatabaseAndTables = async () => {
    const DB_NAME: string = process.env.DB_NAME || 'db-name';

    try {
        await client.connect();

        // Check if database exist
        // https://medium.com/@aashisingh640/node-js-postgresql-create-database-if-it-doesnt-exist-1a93f38629ab
        
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`, [DB_NAME]);

        if (res.rowCount === 0) {
            console.log(`${DB_NAME} database not found, creating it.`);
            await client.query(`CREATE DATABASE "${DB_NAME}";`);
            console.log(`Created database ${DB_NAME}.`);
        } else {
            console.log(`${DB_NAME} database already exists.`);
        }
        await client.end();

        const dbClient = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            database: DB_NAME,
        });

        await dbClient.connect();

        // Create tables
        await dbClient.query(`CREATE TABLE IF NOT EXISTS "user" (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );`);

        await dbClient.query(`CREATE TABLE IF NOT EXISTS categorie (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) UNIQUE NOT NULL
        );`);

        await dbClient.query(`CREATE TABLE IF NOT EXISTS project (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            user_id UUID REFERENCES "user"(id) ON DELETE CASCADE
        );`);

        await dbClient.query(`CREATE TABLE IF NOT EXISTS project_categories (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            project_id UUID REFERENCES project(id) ON DELETE CASCADE,
            category_id UUID REFERENCES categorie(id) ON DELETE CASCADE
        );`);

        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error while checking or creating the database', error);
    } finally {
        await client.end();
    }
};
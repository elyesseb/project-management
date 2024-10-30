import express from 'express';
import cors from 'cors';
import { createDatabaseAndTables } from "./database/createDatabase";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

createDatabaseAndTables()
    .then(() => console.log('Database setup completed'))
    .catch((err) => console.error('Error during database setup', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
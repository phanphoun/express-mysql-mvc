import express from 'express';
import Database from './src/config/db.js';
import userRouter from './src/router/userRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRouter);

const startServer = async () => {
    try {
        const db = await Database.getInstance();
        console.log('Database connected successfully');
        
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
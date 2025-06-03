import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ConnectDB from './config/db.js';
import userRoute from "./routes/user.route.js";
import booksRoute from './routes/book.routes.js';
import myBooksRoute from './routes/myBook.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.get('/', (req, res) => {
    res.send('Hello! Working');
});

app.use('/api/user', userRoute);
app.use('/api/books', booksRoute);
app.use('/api/mybooks', myBooksRoute);



const PORT = process.env.PORT || 8080;
app.listen(PORT, async() => {
    try {
        await ConnectDB();
        console.log(`Server is running on ${PORT}`);
    } catch (err) {
        console.log(`Server connection failed!`);
    }
});
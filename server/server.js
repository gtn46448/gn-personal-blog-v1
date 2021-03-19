import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemon from 'nodemon';

import postRoutes from './routes/posts.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' }));
app.use(cors());

app.use('/posts', postRoutes);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.error(error.message));

mongoose.set('useFindAndModify', false);
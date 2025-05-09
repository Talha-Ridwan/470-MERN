import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import therapistRoutes from './routes/therapistRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import postRoutes from './routes/postRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import breathingRoutes from './routes/breathingRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
    }),
}));

app.use('/api/users', userRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/posts', postRoutes);
app.use(quoteRoutes);
app.use('/api/breathing', breathingRoutes);
app.use('/api/challenge', challengeRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB", err);
});
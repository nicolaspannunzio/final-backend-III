import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js";
import swaggerDocs from './swagger/swagger.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("Error connecting to the database:", err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);

swaggerDocs(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

export default app;
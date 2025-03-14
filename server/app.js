import express from 'express'
import cors from 'cors'
import navsRoutes from './routes/navs.routes.js';

const app = express()
app.use(express.json());
app.use(cors());
app.use("/api/navs", navsRoutes);

export default app;
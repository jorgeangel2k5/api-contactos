import "dotenv/config";
import express from 'express';
import connectDB from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from "./routes/auth.routes.js";


const app = express();
const port = 4500;

// Conexion con mongoDB
connectDB();

// Middlewares
app.use(express.json());

app.use('/api/contacts', contactRoutes);
app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
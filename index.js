import express from 'express';
import connectDB from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const port = 4500;

// Conexion con mongoDB
connectDB();

// Middlewares
app.use(express.json());

app.use('/api/contacts', contactRoutes);
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
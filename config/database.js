import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/backend');
    console.log('🟢 Conectado exitosamente a MongoDB (backend)');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error.message);
  }
};

export default connectDB;
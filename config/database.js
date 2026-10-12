import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🟢 Conectado exitosamente a MongoDB');
    } catch (error) {
        console.error('🔴 Error al conectar a MongoDB:', error.message);
    }
};

export default connectDB;
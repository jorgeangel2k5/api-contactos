import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

export default model("Contacto", contactSchema);
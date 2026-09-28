import Contact from "../models/Contacto.js";

// GET: Obtener todos
const getContacts = async (req, res) => {
  const contactos = await Contact.find();
  res.json(contactos);
};

// POST: Crear registro
const postContact = async (req, res) => {
  const { nombre, telefono, email } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({ msg: "Nombre y teléfono requeridos" });
  }

  const contacto = await Contact.create({ nombre, telefono, email });
  res.status(201).json(contacto);
};

// PUT: Actualizar por ID
const putContact = async (req, res) => {
  const contacto = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contacto);
};

// DELETE: Eliminar por ID
const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ msg: "Contacto eliminado" });
};

export { getContacts, postContact, putContact, deleteContact };
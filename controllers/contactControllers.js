import Contact from "../models/Contacto.js";

// GET: Obtener todos los contactos
const getContacts = async (req, res) => {
  try {
    const contactos = await Contact.find();
    res.json({ contactos });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener contactos" });
  }
};

// POST [ para crear el registro]
const postContact = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ msg: "El nombre y el teléfono son obligatorios" });
    }

    const contacto = new Contact({ nombre, telefono, email });
    await contacto.save();

    res.status(201).json({
      msg: "¡Contacto guardado exitosamente!",
      contacto,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al guardar el contacto" });
  }
};

// PUT: [actualiza el registro]
const putContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;

    
    const contactoActualizado = await Contact.findByIdAndUpdate(
      id,
      { nombre, telefono, email },
      { new: true, runValidators: true }
    );

    if (!contactoActualizado) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }

    res.json({
      msg: "Contacto actualizado exitosamente",
      contacto: contactoActualizado,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el contacto" });
  }
};

// DELETE [elimina]
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contactoEliminado = await Contact.findByIdAndDelete(id);

    if (!contactoEliminado) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }

    res.json({
      msg: "Contacto eliminado exitosamente",
      contacto: contactoEliminado,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el contacto" });
  }
};

export { getContacts, postContact, putContact, deleteContact };
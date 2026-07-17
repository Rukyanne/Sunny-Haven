import Contact from '../models/Contact.js';

const createContact = async (req, res) => {
  const { name, email, phone, message, property } = req.body;
  const contact = await Contact.create({ name, email, phone, message, property });
  res.status(201).json({ success: true, contact });
};

const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, contacts });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
  res.json({ success: true, contact });
};

export default { createContact, getContacts, getContactById };

import Appointment from '../models/Appointment.js';

const createAppointment = async (req, res) => {
  const { property, date, time, notes } = req.body;
  const appointment = await Appointment.create({ property, user: req.user.userId, date, time, notes });
  res.status(201).json({ success: true, appointment });
};

const getAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user.userId }).populate('property', 'title address city');
  res.json({ success: true, appointments });
};

const getAppointmentById = async (req, res) => {
  const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user.userId }).populate('property', 'title address city');
  if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
  res.json({ success: true, appointment });
};

export default { createAppointment, getAppointments, getAppointmentById };

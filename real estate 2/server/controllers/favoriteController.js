import Favorite from '../models/Favorite.js';
import Property from '../models/Property.js';

const addFavorite = async (req, res) => {
  const { propertyId } = req.params;
  const existing = await Favorite.findOne({ user: req.user.userId, property: propertyId });
  if (existing) return res.status(409).json({ success: false, message: 'Property already in favorites' });
  const favorite = await Favorite.create({ user: req.user.userId, property: propertyId });
  res.status(201).json({ success: true, favorite });
};

const removeFavorite = async (req, res) => {
  const { propertyId } = req.params;
  const favorite = await Favorite.findOneAndDelete({ user: req.user.userId, property: propertyId });
  if (!favorite) return res.status(404).json({ success: false, message: 'Favorite not found' });
  res.json({ success: true, message: 'Favorite removed' });
};

const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.userId }).populate('property');
  res.json({ success: true, favorites });
};

export default { addFavorite, removeFavorite, getFavorites };

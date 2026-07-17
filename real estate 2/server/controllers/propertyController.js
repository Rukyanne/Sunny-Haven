import Property from '../models/Property.js';
import { processImages } from '../utils/uploads.js';

const createProperty = async (req, res) => {
  const propertyData = { ...req.body, agent: req.body.agent || req.user.userId };
  if (req.files && req.files.length) {
    propertyData.images = await processImages(req.files);
  }
  const property = await Property.create(propertyData);
  res.status(201).json({ success: true, property });
};

const updateProperty = async (req, res) => {
  const updates = { ...req.body };
  if (req.files && req.files.length) {
    updates.images = await processImages(req.files);
  }
  const property = await Property.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  res.json({ success: true, property });
};

const deleteProperty = async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  res.json({ success: true, message: 'Property deleted' });
};

const getFeaturedProperties = async (req, res) => {
  const properties = await Property.find({ isFeatured: true }).limit(8).sort({ createdAt: -1 });
  res.json({ success: true, properties });
};

const getLatestProperties = async (req, res) => {
  const properties = await Property.find().limit(12).sort({ createdAt: -1 });
  res.json({ success: true, properties });
};

const searchProperties = async (req, res) => {
  const { keyword, city, state, country, minPrice, maxPrice, bedrooms, bathrooms, status, category, agent } = req.query;
  const filters = {};
  if (keyword) filters.$text = { $search: keyword };
  if (city) filters.city = city;
  if (state) filters.state = state;
  if (country) filters.country = country;
  if (status) filters.status = status;
  if (category) filters.category = category;
  if (agent) filters.agent = agent;
  if (minPrice || maxPrice) filters.price = {};
  if (minPrice) filters.price.$gte = Number(minPrice);
  if (maxPrice) filters.price.$lte = Number(maxPrice);
  if (bedrooms) filters.bedrooms = Number(bedrooms);
  if (bathrooms) filters.bathrooms = Number(bathrooms);

  const properties = await Property.find(filters).sort({ createdAt: -1 });
  res.json({ success: true, properties });
};

const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id).populate('agent');
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  res.json({ success: true, property });
};

export default { createProperty, updateProperty, deleteProperty, getFeaturedProperties, getLatestProperties, searchProperties, getPropertyById };

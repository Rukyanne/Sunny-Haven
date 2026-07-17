import Review from '../models/Review.js';
import Property from '../models/Property.js';
import Agent from '../models/Agent.js';

const createReview = async (req, res) => {
  const { property, agent, rating, comment } = req.body;
  const review = await Review.create({ user: req.user.userId, property, agent, rating, comment });
  if (property) {
    const propertyReviews = await Review.find({ property });
    const averageRating = propertyReviews.reduce((sum, review) => sum + review.rating, 0) / propertyReviews.length;
    await Property.findByIdAndUpdate(property, { averageRating, ratingsCount: propertyReviews.length });
  }
  if (agent) {
    const agentReviews = await Review.find({ agent });
    const averageRating = agentReviews.reduce((sum, review) => sum + review.rating, 0) / agentReviews.length;
    await Agent.findByIdAndUpdate(agent, { averageRating, ratingsCount: agentReviews.length });
  }
  res.status(201).json({ success: true, review });
};

const getReviews = async (req, res) => {
  const reviews = await Review.find().populate('user', 'name avatar').populate('property', 'title').populate('agent', 'name');
  res.json({ success: true, reviews });
};

const getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id).populate('user', 'name avatar').populate('property', 'title').populate('agent', 'name');
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
  res.json({ success: true, review });
};

export default { createReview, getReviews, getReviewById };

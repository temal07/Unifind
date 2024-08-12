import University from '../models/universityModel.js';
import { errorHandler } from '../utils/errorHandler.js';

export const getUniversities = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 3;

    // Initialize query object
    const query = {};

    // Optional filters based on query parameters
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    if (req.query.universityId) {
      query._id = req.query.universityId;
    }

    if (req.query.searchTerm) {
      query.$or = [{ name: { $regex: req.query.searchTerm, $options: 'i' } }];
    }

    const {
      q,
    } = req.query;

    // Handle search term
    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }

    const univs = await University.find(query)
      .sort({ updatedAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalUnivs = await University.countDocuments(query);

    res.status(200).json({ univs, totalUnivs });
  } catch (error) {
    next(errorHandler(error.statusCode, error.message));
  }
};

export const getUniversity = async (req, res, next) => {
  try {
      const university = await University.findById(req.params.universityId);
      if (!university) {
          return next(errorHandler(404, 'University not found.'));
      }
    
      res.status(200).json(university);
  } catch (error) {
      return next(errorHandler(error.statusCode, error.message));
  }
}   

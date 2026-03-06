const express =require('express');
const router = express.Router();
const authMiddleware= require('../middlewares/auth.middleware')
const mapController=require('../controller/maps.controller')
const {query   } =require('express-validator')

// For frontend compatibility: suggestions endpoint
router.get('/suggestions', async (req, res, next) => {
  const q = req.query.q;
  if (!q || q.length < 3) return res.json({ suggestions: [] });
  try {
    const mapService = require('../services/maps.service');
    const suggestions = await mapService.getAutoCompleteSuggestions(q);
    // Return as { suggestions: [...] }
    res.json({ suggestions: suggestions.map(s => s.description || s) });
  } catch (err) {
    res.status(500).json({ suggestions: [] });
  }
});

router.get('/get-cordinates',
  query('address').isString().isLength({min:3 }),
  authMiddleware.authUser,mapController.getCoordinates);

  router.get('/get-distance-time',
query('origin').isString().isLength({ min: 3}),
query('destination').isString().isLength({ min: 3}),
authMiddleware.authUser,
mapController.getDistanceTime,
)

router.get('/get-suggestions',
query('input').isString().isLength({ min: 3}),
authMiddleware.authUser,
mapController.getAutoCompleteSuggestions
)
module.exports = router;

  
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Review = require('../../models/Review');
const User = require('../../models/User');

// @route POST api/reviews/:employee_id/:id
// @desc  Create or update a review for an employee by review id
// @access Private
router.post(
  '/:employee_id/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('rating', 'Rating is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.params.employee_id).select(
        '-password'
      );
      const { text, rating, reviewers } = req.body;
      let newReview = {
        user: user._id,
        admin: req.user.id,
        text: text,
        name: user.name,
        avatar: user.avatar,
        rating: rating,
        reviewers: reviewers
      };
      if (req.params.id !== 'new') {
        let review = await Review.findById(req.params.id);
        if (review) {
          review = await Review.findOneAndUpdate(
            { _id: req.params.id },
            { $set: newReview },
            { new: true }
          );
          return res.json(review);
        }
      } else {
        review = new Review(newReview);
        await review.save();
        return res.json(review);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/reviews
// @desc  GET all reviews
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      date: -1
    }); //most recent first
    res.json(reviews);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/reviews/:id
// @desc  GET a review by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Performance review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Performance review not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/reviews/:id
// @desc  delete a review by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Performance review not found' });
    }
    // Check user
    if (review.admin.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await review.remove();

    res.json({ msg: 'Performance review deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Performance review not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route POST api/reviews/feedback/:id
// @desc  Give feedback on a performance review
// @access Private
router.post(
  '/feedback/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const review = await Review.findById(req.params.id);

      const newFeedback = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };
      review.feedbacks.unshift(newFeedback);
      review.save();
      res.json(review.feedbacks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/reviews/feedback/:id/:feedback_id
// @desc  Delete a feedback on a performance review
// @access Private

router.delete('/feedback/:id/:feedback_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    //pull out feedback
    const feedback = review.feedbacks.find(
      feedback => feedback.id === req.params.feedback_id
    );
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback does not exist' });
    }

    // Check user is the one who made the feedback
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    review.feedbacks = review.feedbacks.filter(
      feedback => feedback.id !== req.params.feedback_id
    );
    await review.save();
    return res.json(review.feedbacks);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

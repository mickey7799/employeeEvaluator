const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Review = require('../../models/Review');

// @route GET api/profile/me
// @desc  Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar', 'isAdmin']
    ); //adding in some feilds from the user model
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile/:employee_id
// @desc  Create or update user profile
// @access Private
router.post(
  '/:employee_id',
  [
    auth,
    [
      check('department', 'Department is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty(),
      check('status', 'Role is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { department, bio, skills, status, githubusername } = req.body;

    //Build profile object
    const profileFields = {
      user: req.params.employee_id,
      department,
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => ' ' + skill.trim()),
      status,
      githubusername
    };

    try {
      let profile = await Profile.findOne({ user: req.params.employee_id });
      if (profile) {
        //if profile exist, Update
        profile = await Profile.findOneAndUpdate(
          { user: req.params.employee_id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //if profile does not exist, Create one
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/profile
// @desc  Get all profiles
// @access Private (only admin can view all employee profiles)
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id
// @desc  Get profile by user id
// @access Private (only admin can view employee profile)
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/profile/
// @desc  Delete profile, user & posts
// @access Private (only user itself can delete it's profile)
router.delete('/', auth, async (req, res) => {
  try {
    // remove users posts first
    await Review.deleteMany({ user: req.user.id });
    // then, Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // finally, Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/profile/:employee_id
// @desc  Delete profile, user & posts for an employee
// @access Private (used by admin to delete employee profile)
router.delete('/:employee_id', auth, async (req, res) => {
  try {
    await Review.deleteMany({ user: req.params.employee_id });
    await Profile.findOneAndRemove({ user: req.params.employee_id });
    await User.findOneAndRemove({ _id: req.params.employee_id });
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/github/:username
// @desc  Get user repos from Github
// @access Public

router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;

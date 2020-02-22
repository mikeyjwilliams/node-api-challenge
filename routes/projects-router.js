const express = require('express');
const router = express.Router();
const projectModel = require('../data/helpers/projectModel');

router.get('/', async (req, res, next) => {
  try {
    const getProjects = await projectModel.get();
    res.status(200).json(getProjects);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name required for project' });
  }
  if (!description) {
    return res
      .status(400)
      .json({ message: 'description required for project' });
  }
  const projectPost = {
    name: name,
    description: description,
    completed: req.body.completed || false,
  };
  try {
    const post = await projectModel.insert(projectPost);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
